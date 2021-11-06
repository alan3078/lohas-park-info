import React, { useEffect, useState, useRef } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import getNextTrainData from './next-train-service'
import { NextTrainResponse, line } from '../../typings/NextTrainResponse'
import { msToTime } from '../../helpers/msToTime'
import { useTranslation } from 'react-i18next'

import NextTrainCard from '../next-train-card/next-train-card'
import './next-train.scss'

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
      }).finally(() => setIsLoading(false))
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
      <Container>
        最後更新時間: {timeUpdate.varOne.toLocaleTimeString()}{' '}{isLoading && (
          <span >
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
            const validTime: boolean = Date.parse(trainData.time) - timeStamp.varTwo.getTime() < 0
            const remainingTime = msToTime(
              Date.parse(trainData.time) - timeStamp.varTwo.getTime()
            )

            const cardText = validTime
              ? '走左喇, 下架啦！'
              : 'Remaing Time:' + remainingTime

            return (
              <>
                <NextTrainCard key={trainData.ttnt} title={trainData.time} text={cardText}/>
              </>
            )
          })
          : '已經無車啦'}
      </Container>
    </div>
  )
}

export default NextTrain
