import React from 'react'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import TopNavBar from './components/top-nav-bar/TopNavBar'
import NextTrain from './components/next-train/NextTrain'
import './i18n'
import FloatingButton from './components/floating-button/FloatingButton'
import Gallery from './components/gallery/Gallery'
import 'swiper/swiper-bundle.min.css'

const App: React.FC<{}> = () => (
  <div>
    <Container>
      <TopNavBar />
      <NextTrain />
      <FloatingButton />
      <Gallery />
    </Container>
  </div>
)

export default App
