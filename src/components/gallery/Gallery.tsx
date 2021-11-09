import React from 'react'
import YouTube, { Options } from 'react-youtube'
import { useMediaQuery } from 'react-responsive'
import './Gallery.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay
} from 'swiper'
// Import Swiper styles
import 'swiper/swiper.scss' // core Swiper
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay])

const Gallery: React.FC = () => {
  const id = ['hPK7KQ_IxGk', 'xArGmnjE66I', '-DhkJG929Oc']
  const isLG = useMediaQuery({ minWidth: 992 })
  const opts: Options = isLG
    ? {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          rel: 0
        }
      }
    : {
        height: '225',
        width: '400',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          rel: 0
        }
      }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 10000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }}
      >
        {id.map((video, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="gallery-view">
                <YouTube className="video-view" videoId={video} opts={opts} />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Gallery
