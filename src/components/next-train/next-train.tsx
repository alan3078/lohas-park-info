import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import getNextTrainData from './next-train-service';
import { NextTrainResponse, line } from '../../typings/NextTrainResponse';
import './next-train.scss'

const NextTrain: React.FunctionComponent = () => {
  const [nextTrainData, setNextTrainData] = useState([] as line[])
  const timeStamp = new Date()

  const download = () => {
    getNextTrainData().then((result: NextTrainResponse) => {
      const data: line[] = result.data['TKL-LHP'].DOWN
      setNextTrainData(data)
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const msToTime = (s: number) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }

  useEffect(() => download(), [])

  return (
    <div>
      <Container>
        MTR Next Train
        {nextTrainData.map((trainData) => {
          return (
            <li className="train-list" key={trainData.ttnt}>{trainData.time} Remaining Time: {msToTime(Date.parse(trainData.time) - timeStamp.getTime())}
            </li>
          )
        })}

      </Container>
    </div>
  )
}




export default NextTrain
