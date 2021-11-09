import axios from 'axios'
import { WeatherResponse } from '../../typings/WeatherResponse'

const baseUrl =
  'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread'

const getWeatherData = async (): Promise<WeatherResponse> => {
  const data = (await axios.get(baseUrl)).data as WeatherResponse
  return data
}

export default getWeatherData
