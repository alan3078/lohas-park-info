import axios from 'axios'
import { WeatherResponse } from '../../typings/WeatherResponse'
import { WindSpeedResponse } from '../../typings/WindSpeedResponse'

const tempatureUrl =
  'https://asia-east2-audio-to-text-for-whatsa-7580a.cloudfunctions.net/get-wind-speed?data=tempature'

const windSpeedUrl =
  'https://asia-east2-audio-to-text-for-whatsa-7580a.cloudfunctions.net/get-wind-speed'

const getWeatherData = async (): Promise<WeatherResponse> => {
  const data = (await axios.get(tempatureUrl)).data as WeatherResponse
  return data
}

const getWindSpeed = async (): Promise<WindSpeedResponse> => {
  const data = (await axios.get(windSpeedUrl)).data as WindSpeedResponse
  return data
}

export { getWeatherData, getWindSpeed }
