import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import getWeatherData from './WeatherService'
import {
  WeatherResponse,
  LocalWeatherData
} from '../../typings/WeatherResponse'
import { useTranslation } from 'react-i18next'
import './Weather.scss'

const TKO = 'Tseung Kwan O'

const kmPerHour2MeterPerSecond = (kmPerHour: number) => {
  return kmPerHour / 3.6
}

const apparentTemperature = (tempature: number, windspeed: number) => {
  return tempature - 2 * Math.sqrt(windspeed)
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState({} as LocalWeatherData)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const download = () => {
    setIsLoading(true)
    getWeatherData()
      .then((result: WeatherResponse) => {
        const data: LocalWeatherData[] = result.temperature.data.filter(
          c => c.place === TKO
        )
        setWeatherData(data[0])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const displayWeatherTempature =
    t('weather:TKO') + ': ' + weatherData.value + t('weather:tempature-unit')

  const displayApparentTemperature =
    t('weather:apparent-temperature') +
    ': ' +
    apparentTemperature(weatherData.value, kmPerHour2MeterPerSecond(5)).toFixed(
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
