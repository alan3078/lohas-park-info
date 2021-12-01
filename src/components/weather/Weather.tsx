import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { getWeatherData, getWindSpeed } from './WeatherService'
import {
  WeatherResponse,
  LocalWeatherData
} from '../../typings/WeatherResponse'
import { useTranslation } from 'react-i18next'
import './Weather.scss'
import { WindSpeedData, WindSpeedResponse } from '../../typings/WindSpeedResponse'

const TKO = 'Tseung Kwan O'

const kmPerHour2MeterPerSecond = (kmPerHour: number) => {
  return kmPerHour / 3.6
}

const apparentTemperature = (tempature: number, windspeed: number) => {
  return tempature - 2 * Math.sqrt(windspeed)
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState({} as LocalWeatherData)
  const [windSpeed, setWindSpeed] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const download = () => {
    setIsLoading(true)
    getWeatherData()
      .then((result: WeatherResponse) => {
        const data: LocalWeatherData[] = result.data.filter(
          c => c['Automatic Weather Station'] === TKO
        )
        setWeatherData(data[0])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
    getWindSpeed()
      .then((result: WindSpeedResponse) => {
        const data: WindSpeedData[] = result.data.filter(
          c => c['Automatic Weather Station'] === TKO
        )
        setWindSpeed(parseInt(data[0]['10-Minute Mean Speed(km/hour)'], 10))
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const displayWeatherTempature =
    t('weather:lohas') + ': ' + weatherData['Air Temperature(degree Celsius)'] + t('weather:tempature-unit')

  const displayApparentTemperature =
    t('weather:apparent-temperature') +
    ': ' +
    apparentTemperature(parseInt(weatherData['Air Temperature(degree Celsius)'], 10), kmPerHour2MeterPerSecond(windSpeed)).toFixed(
      2
    ) +
    t('weather:tempature-unit')

  useEffect(() => {
    download()
  }, [])

  return (
    <div className="weather-container">
      {isLoading
        ? (
          <span>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </span>
        )
        : (
          displayWeatherTempature
        )}
      <br />
      {displayApparentTemperature}
    </div>
  )
}

export default Weather
