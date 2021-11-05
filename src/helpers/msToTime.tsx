export const msToTime = (s: number) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  if (hrs !== 0){
    return hrs + ':' + mins + ':' + secs;
  }else {
    return mins + ':' + secs;
  }
  
}