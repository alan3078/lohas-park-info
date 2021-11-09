import React, { useEffect, useState, useRef } from 'react'
import { Spinner, Form } from 'react-bootstrap'
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
  const [fromWhere, setFromWhere] = useState('TIK')
  const checkDest = (data: line[]) => {
    const toLHP = data.filter(s => s.dest === 'LHP')
    if (toLHP) {
      setNextTrainData(toLHP)
    }
  }
  const fromWhereOption = [
    { name: t('nextTrain:TIK'), value: 'TIK' },
    { name: t('nextTrain:NOP'), value: 'NOP' },
    { name: t('nextTrain:LHP'), value: 'LHP' }
  ]
  const download = (fromWhere: String) => {
    setIsLoading(true)
    getNextTrainData(fromWhere)
      .then((result: NextTrainResponse) => {
        if (fromWhere === 'TIK') {
          const data: line[] = result.data['TKL-TIK'].UP
          checkDest(data)
        } else if (fromWhere === 'NOP') {
          const data: line[] = result.data['TKL-NOP'].UP
          checkDest(data)
        } else {
          const data: line[] = result.data['TKL-LHP'].DOWN
          setNextTrainData(data)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }
  useEffect(() => {
    download(fromWhere)
    setTimeUpdate({ varOne: new Date() })
  }, [fromWhere])

  useEffect(() => {
    counter.current += 1
    const timer = setTimeout(() => setTimes({ num: time.num + 1 }), 1000)
    setTimeStamp({ varTwo: new Date() })
    if (counter.current % 30 === 0) {
      download(fromWhere)
      setTimeUpdate({ varOne: new Date() })
    }
    return () => clearTimeout(timer)
  }, [time])

  return (
    <div>
      {t('nextTrain:latestUpdate')}:{' '}
      {timeUpdate.varOne.toLocaleTimeString(t('common:dateFormat'))} <br />
      {t('nextTrain:fromWhere')}
      <Form>
        {fromWhereOption.map((fromWhereOption, idx) => (
          <Form.Check
            inline
            key={idx}
            id={`fromWhere-${idx}`}
            label={fromWhereOption.name}
            type="radio"
            name="fromWhere"
            value={fromWhereOption.value}
            checked={fromWhere === fromWhereOption.value}
            onChange={e => setFromWhere(e.currentTarget.value)}
          />
        ))}
      </Form>
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
      {t('common:nextTrain')}
      {t('common:to')}
      {fromWhere === 'TIK' || fromWhere === 'NOP'
        ? t('nextTrain:LHP')
        : t('nextTrain:NOP/TIK')}
      <br />
      {nextTrainData.length > 0
? (
        nextTrainData.map(trainData => {
          const remainingTime =
            Date.parse(trainData.time.replace(/-/g, '/')) -
            timeStamp.varTwo.getTime()

          const displayTime = msToTime(
            remainingTime,
            t('common:hrs'),
            t('common:mins'),
            t('common:secs')
          )

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
      )
: fromWhere === 'NOP'
? (
        <span>{t('nextTrain:northPointNotice')}</span>
      )
: (
        <span>已經冇車喇</span>
      )}
    </div>
  )
}

export default NextTrain
