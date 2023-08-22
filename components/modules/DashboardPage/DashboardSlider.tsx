import React from 'react';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {useStore} from 'effector-react';

import {$mode} from '../../../context/mode';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {IDashboardSlider} from '../../../types/dashboard';

import styles from '../../../styles/dashboard/index.module.scss'
import skeletonStyles from '../../../styles/skeleton/index.module.scss'
import Link from 'next/link';
import {formatPrice} from '../../../utils/common';

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

//TODO: Понять почему не меняется на белый цвет

export const DashboardSlider = ({items, spinner, goToPartPage}: IDashboardSlider) => {

  const isMedia560 = useMediaQuery(560)
  const isMedia768 = useMediaQuery(768)
  const isMedia800 = useMediaQuery(800)
  const isMedia1030 = useMediaQuery(1030)
  const isMedia1366 = useMediaQuery(1366)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


  React.useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia560 ? '276px' : '390px'
      list.style.padding = '0 5px'
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
    })
  }, [isMedia560, isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: isMedia768 ? 1 : 2,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    /*slidesToShow: items.length >= 4 ? (isMedia1030 ? 3 : 4) : items.length - 1,*/
  };

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
  }


  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((i) => (
          <div className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `.${skeletonStyles.dark_mode}` : ''}`}
               key={i} style={width}>
            <div className={skeletonStyles.skeleton__item__light}/>
          </div>
        ))
      ) : items.length ? (
        items.map((i) => (
          <div className={`${styles.dashboard__slide} ${darkModeClass}`} key={i.id} style={width}>
            <img src={JSON.parse(i.images)[0]} alt={i.name}/>
            <div className={styles.dashboard__slide__inner}>
              <Link href={goToPartPage ? `/catalog/${i.id}` : '/catalog'} passHref legacyBehavior>
                <a>
                  <h3 className={`${styles.dashboard__slide__title} ${darkModeClass}`}>{i.name}</h3>
                </a>
              </Link>
              <span className={styles.dashboard__slide__code}>Артикул: {i.vendor_code}</span>
              <span className={styles.dashboard__slide__price}>{formatPrice(i.price)} ₽</span>
            </div>
          </div>
        ))
      ) : <span>Список товаров пуст...</span>}
    </Slider>
  )
}
