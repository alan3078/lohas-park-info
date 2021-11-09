import axios from 'axios'
import { NextTrainResponse } from '../../typings/NextTrainResponse'

const TIKUrl =
  'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=TIK&lang=TC'

const NOPUrl =
  'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=NOP&lang=TC'

const LHPUrl =
  'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP&lang=TC'

const getNextTrainData = async (fromWhere: String): Promise<NextTrainResponse> => {
  if (fromWhere === 'TIK') {
    const data = (await axios.get(TIKUrl)).data as NextTrainResponse
    return data
  } else if (fromWhere === 'NOP') {
    const data = (await axios.get(NOPUrl)).data as NextTrainResponse
    return data
  } else {
    const data = (await axios.get(LHPUrl)).data as NextTrainResponse
    return data
  }
}

export default getNextTrainData
