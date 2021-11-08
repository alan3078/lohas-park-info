import React, { useEffect, useState, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import getNextTrainData from './NextTrainService'
import { NextTrainResponse, line } from '../../typings/NextTrainResponse'
import { msToTime } from '../../helpers/msToTime'
import { useTranslation } from 'react-i18next'
import { RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from '@mui/material'
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
    const toLHP = data.filter(
        s =>
            s.dest === 'LHP'
    )
    if (toLHP) {
      setNextTrainData(toLHP)
    }
}
  const download = (fromWhere: String) => {
    setIsLoading(true)
    getNextTrainData(fromWhere)
      .then((result: NextTrainResponse) => {
        if (fromWhere === 'TIK') {
          const data: line[] = result.data['TKL-TIK'].UP
          checkDest(data)
        } else {
          const data: line[] = result.data['TKL-NOP'].UP
          checkDest(data)
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
      {t('nextTrain:latestUpdate')}: {timeUpdate.varOne.toLocaleTimeString(t('common:dateFormat'))}{' '}
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">{t('nextTrain:fromWhere')}</FormLabel>
        <RadioGroup
          row
          aria-label="From"
          defaultValue="TIK"
          value={fromWhere}
          onChange={(e) => { setFromWhere(e.target.value) } }
          name="FromWhere"
        >
          <FormControlLabel value="TIK" control={<Radio />} label={t('nextTrain:TIK')} />
          <FormControlLabel value="NOP" control={<Radio />} label={t('nextTrain:NOP')} />
        </RadioGroup>
      </FormControl>
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
        : fromWhere === 'NOP'
          ? <span>{t('nextTrain:northPointNotice')}</span>
          : <span>已經冇車喇</span>
      }
    </div>
  )
}

export default NextTrain
