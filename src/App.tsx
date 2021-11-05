import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import TopNavBar from './components/top-nav-bar/top-nav-bar'
import NextTrain from './components/next-train/next-train'
import './i18n'

const App: React.FC<{}> = () => (
  <>
    <TopNavBar />
    <NextTrain />
  </>
)

export default App
