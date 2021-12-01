export type LocalWeatherData = {
  'Date time': string
  'Automatic Weather Station': string
  'Air Temperature(degree Celsius)': string
}

export type WeatherResponse = {
  data: LocalWeatherData[]
}
