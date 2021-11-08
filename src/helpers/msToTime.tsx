export const msToTime = (s: number) => {
  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60
  const hrs = (s - mins) / 60
  if (hrs !== 0) {
    return hrs + ':' + mins + ':' + secs
  } else {
    return mins + ':' + secs
  }
}
