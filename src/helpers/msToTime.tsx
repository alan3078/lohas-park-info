export const msToTime = (s: number) => {
  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60
  const hrs = (s - mins) / 60
  const hrsString = hrs.toString()
  const minsString = mins.toString()
  const secsString = secs.toString()
  if (hrs !== 0) {
    return hrsString + ':' + minsString + ':' + secsString
  } else {
    return minsString + ':' + secsString
  }
}
