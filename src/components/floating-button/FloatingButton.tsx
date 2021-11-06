import React from 'react'
// import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import changeLanguage from '../../helpers/changeLanguage'
import { languages } from '../../i18n'
import './FloatingButton.scss'

const FloatingButton: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation()
  const { language: currentLanguage } = i18n
  const displayLangs = languages.filter(c => c !== currentLanguage)[0]
  return (
    <div
      className="language-circle-btn"
      onClick={() => changeLanguage(displayLangs)}
    >
      {t(`common:${displayLangs}`)}
    </div>
  )
}

export default FloatingButton
