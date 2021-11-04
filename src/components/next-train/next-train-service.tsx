import axios from 'axios'
import { NextTrainResponse } from '../../typings/NextTrainResponse'

const baseUrl = 'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP&lang=TC'

const getNextTrainData = async (): Promise<NextTrainResponse> => {
    const data = (await axios.get(baseUrl)).data as NextTrainResponse
    return data
}

export default getNextTrainData
