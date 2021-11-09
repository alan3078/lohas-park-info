import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import TopNavBar from './components/top-nav-bar/TopNavBar'
import NextTrain from './components/next-train/NextTrain'
import './i18n'
import FloatingButton from './components/floating-button/FloatingButton'
import Gallery from './components/gallery/Gallery'
import Weather from './components/weather/Weather'
import 'swiper/swiper-bundle.min.css'
import './App.scss'

const App: React.FC<{}> = () => (
  <div>
    <TopNavBar />
    <Weather />
    <NextTrain />
    <FloatingButton />
    <Gallery />
  </div>
)

export default App
