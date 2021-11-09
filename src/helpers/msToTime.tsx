export const msToTime = (
  s: number,
  hrsString: String,
  minsString: String,
  secsString: String
) => {
  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60
  const hrs = (s - mins) / 60
  const hrs_s = hrs.toString()
  const mins_s = mins.toString()
  const secs_s = secs.toString()
  if (hrs > 0) {
    return hrs_s + hrsString + mins_s + minsString + secs_s + secsString
  } else if (mins > 0) {
    return mins_s + minsString + secs_s + secsString
  } else {
    return secs_s + secsString
  }
}
