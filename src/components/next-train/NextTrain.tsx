import React, { useEffect, useState, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import getNextTrainData from './NextTrainService'
import { NextTrainResponse, line } from '../../typings/NextTrainResponse'
import { msToTime } from '../../helpers/msToTime'
import { useTranslation } from 'react-i18next'

import NextTrainCard from '../next-train-card/NextTrainCard'
import './NextTrain.scss'

const NextTrain: React.FunctionComponent = () => {
  const [nextTrainData, setNextTrainData] = useState([] as line[])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timeUpdate, setTimeUpdate] = useState({ varOne: new Date() })
  const [timeStamp, setTimeStamp] = useState({ varTwo: new Date() })
  const [time, setTimes] = useState({ num: 0 })
  const counter = useRef(0)
  const { t } = useTranslation()

  const download = () => {
    setIsLoading(true)
    getNextTrainData()
      .then((result: NextTrainResponse) => {
        const data: line[] = result.data['TKL-LHP'].DOWN
        setNextTrainData(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
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
    <div>
      {t('nextTrain:latestUpdate')}: {timeUpdate.varOne.toLocaleTimeString()}{' '}
      {isLoading && (
        <span>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </span>
      )}
      <br />
      {t('common:nextTrain')}
      <br />
      {nextTrainData.length > 0
        ? nextTrainData.map(trainData => {
            const remainingTime =
              Date.parse(trainData.time.replace(/-/g, '/')) -
              timeStamp.varTwo.getTime()

            const displayTime = msToTime(remainingTime)

            const cardText =
              remainingTime < 0
                ? t('nextTrain:trainLeft')
                : t('nextTrain:remainingTime') + ': ' + displayTime
            return (
              <React.Fragment key={trainData.seq}>
                <NextTrainCard title={trainData.time} text={cardText} />
              </React.Fragment>
            )
          })
        : '已經無車啦'}
    </div>
  )
}

export default NextTrain
