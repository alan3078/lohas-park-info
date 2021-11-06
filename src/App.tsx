import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import TopNavBar from './components/top-nav-bar/TopNavBar'
import NextTrain from './components/next-train/NextTrain'
import './i18n'
import FloatingButton from './components/floating-button/FloatingButton'

const App: React.FC<{}> = () => (
  <>
    <TopNavBar />
    <NextTrain />
    <FloatingButton />
  </>
)

export default App
