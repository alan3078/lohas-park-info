export type LocalWeatherData = {
  place: string
  value: number
  unit: 'C'
}

type WeatherData = {
  data: LocalWeatherData[]
}

export type WeatherResponse = {
  temperature: WeatherData
}
