export type line = {
  ttnt: string
  valid: 'Y' | 'N'
  plat: string
  time: string
  source: string
  dest: string
  seq: string
}

type StationData = {
  curr_time: string
  sys_time: string
  DOWN: line[]
  UP: line[]
}

type Station = {
  'TKL-LHP': StationData
  'TKL-NOP': StationData
  'TKL-TIK': StationData
}

export type NextTrainResponse = {
  status: number
  message: string
  curr_time: string
  sys_time: string
  isdelay: 'Y' | 'N'
  data: Station
}
