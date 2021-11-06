import React, { useEffect, useState, useRef } from 'react'
import { Container } from 'react-bootstrap'
import getNextTrainData from './next-train-service'
import { NextTrainResponse, line } from '../../typings/NextTrainResponse'
import { msToTime } from '../../helpers/msToTime'
import { useTranslation } from 'react-i18next'

import './next-train.scss'

const NextTrain: React.FunctionComponent = () => {
  const [nextTrainData, setNextTrainData] = useState([] as line[])
  const [timeUpdate, setTimeUpdate] = useState({ varOne: new Date() })
  const [timeStamp, setTimeStamp] = useState({ varTwo: new Date() })
  const [time, setTimes] = useState({ num: 0 })
  const counter = useRef(0)
  const { t } = useTranslation()

  const download = () => {
    getNextTrainData()
      .then((result: NextTrainResponse) => {
        const data: line[] = result.data['TKL-LHP'].DOWN
        setNextTrainData(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    counter.current += 1
    const timer = setTimeout(() => setTimes({ num: time.num + 1 }), 1000)
    setTimeStamp({ varTwo: new Date() })
    if (counter.current % 30 === 0) {
      download()
      setTimeUpdate({ varOne: new Date() })
    }
    return () => clearTimeout(timer)
  }, [time])

  useEffect(() => {
    download()
    setTimeUpdate({ varOne: new Date() })
  }, [])

  return (
    <div className="center">
      <Container>
        {t('nextTrain:latestUpdate')}: {timeUpdate.varOne.toLocaleTimeString()}
        <br />
        {t('common:nextTrain')}
        <br />
        {nextTrainData.length > 0
          ? nextTrainData.map(trainData => {
              return (
                <li className="train-list" key={trainData.ttnt}>
                  {trainData.time.replace(/-/g, '/')}
                  {Date.parse(trainData.time.replace(/-/g, '/')) - timeStamp.varTwo.getTime() <
                  0
                  ? (
                    <span>
                      <br />
                      走左喇, 下架啦！
                    </span>
                  )
                  : (
                    <span>
                      <br></br>{t('nextTrain:remainingTime')}:{' '}
                      {msToTime(
                        Date.parse(trainData.time.replace(/-/g, '/')) - timeStamp.varTwo.getTime()
                      )}
                    </span>
                  )}
              </li>
            )
          })
          : '已經無車啦'}
      </Container>
    </div>
  )
}

export default NextTrain
