import React from 'react';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import {useMediaQuery} from '../../../hooks/useMediaQuery';

import styles from '../../../styles/dashboard/index.module.scss'

const brandSlider = [
  {id: 1, img: '/img/brand-1.png', alt: 'brand-1'},
  {id: 2, img: '/img/brand-2.png', alt: 'brand-2'},
  {id: 3, img: '/img/brand-3.png', alt: 'brand-3'},
  {id: 4, img: '/img/brand-4.png', alt: 'brand-4'},
  {id: 5, img: '/img/brand-1.png', alt: 'brand-1'},
  {id: 6, img: '/img/brand-2.png', alt: 'brand-2'},
  {id: 7, img: '/img/brand-3.png', alt: 'brand-3'},
  {id: 8, img: '/img/brand-4.png', alt: 'brand-4'},
  {id: 9, img: '/img/brand-1.png', alt: 'brand-1'},
  {id: 10, img: '/img/brand-2.png', alt: 'brand-2'},
  {id: 11, img: '/img/brand-3.png', alt: 'brand-3'},
  {id: 12, img: '/img/brand-4.png', alt: 'brand-4'},
]

export const BrandSlider = () => {

  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `.${styles.dark_mode}` : ''


  React.useEffect(() => {
    const slider = document.querySelector(`.${styles.dashboard__brands__slider}`) as HTMLElement

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? "60px" : '80px'
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
  };

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandSlider.map((i, index) => (
        <div
          key={i.id}
          className={`${styles.dashboard__brands__slider} ${darkModeClass}`}
          style={{width: isMedia768 ? 124 : 180}}>
          <img src={i.img} alt={i.alt}/>
        </div>
      ))}
    </Slider>
  )
}
