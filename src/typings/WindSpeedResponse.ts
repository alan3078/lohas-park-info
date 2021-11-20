export type WindSpeedData = {
  'Date time': string
  'Automatic Weather Station': string
  '10-Minute Mean Wind Direction(Compass points)': string
  '10-Minute Mean Speed(km/hour)': string
  '10-Minute Maximum Gust(km/hour)': string
}

export type WindSpeedResponse = {
  data: WindSpeedData[]
}
