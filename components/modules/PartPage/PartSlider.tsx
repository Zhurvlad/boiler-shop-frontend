import styles from '../../../styles/part/index.module.scss'
import {useMediaQuery} from '../../../hooks/useMediaQuery';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react';

export const PartSlider = ({images}: { images: string[] }) => {

  const isMobile700 = useMediaQuery(700)
  const isMobile530 = useMediaQuery(530)

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
  };


  return (
    <Slider {...settings} className={styles.part__slider}>
      {images.map((src, index) => (
        <div className={styles.part__slide} key={index} style={{width: isMobile530 ? 228 : isMobile700 ? 350 : 593}}>
          <img src={src} alt={`image-${index + 1}`}/>
        </div>
      ))}
    </Slider>
  )
}
