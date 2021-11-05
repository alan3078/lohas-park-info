import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import getNextTrainData from './next-train-service';
import { NextTrainResponse, line } from '../../typings/NextTrainResponse';
import { msToTime } from '../../helpers/msToTime';

import './next-train.scss'

const NextTrain: React.FunctionComponent = () => {
  const [nextTrainData, setNextTrainData] = useState([] as line[])
  const timeStamp = new Date()

  const download = () => {
    getNextTrainData().then((result: NextTrainResponse) => {
      const data: line[] = result.data['TKL-LHP'].DOWN
      setNextTrainData(data)
    }).catch((err) => {
      console.log(err)
    })
  }


  useEffect(() => {
    download()
  }, [])

  return (
    <div className="center">
      <Container>
        最後更新時間: {timeStamp.toLocaleTimeString()}
        <br />
        MTR Next Train
        <br />
        {nextTrainData.length > 0 ? nextTrainData.map((trainData) => {
          return (
            <li className="train-list" key={trainData.ttnt}>{trainData.time} Remaining Time: {msToTime(Date.parse(trainData.time) - timeStamp.getTime())}
            </li>
          )
        }) : "已經無車啦"}
      </Container>
    </div>
  )
}




export default NextTrain
