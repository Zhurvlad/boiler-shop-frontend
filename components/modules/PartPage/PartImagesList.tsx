import {useStore} from 'effector-react';
import styles from '../../../styles/part/index.module.scss';
import {$boilerPart} from '../../../context/boilerPart';
import React, {useState} from 'react';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {PartImagesItem} from './PartImagesItem';
import {PartSlider} from './PartSlider';



export const PartImagesList = () => {

  const boilerPart = useStore($boilerPart)
  const isMobile = useMediaQuery(850)
  const images = boilerPart.images ? JSON.parse(boilerPart.images) : []
  const [currentImgSrc, setCurrentPageImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile
        ? <PartSlider images={images}/>
        : <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name}/>
          </div>
          <ul className={styles.part__images__list}>{images.map((i, index) => <PartImagesItem key={index}
                                                                                              alt={`image-${i + 1}`} src={i} callback={setCurrentPageImgSrc}/>)}</ul>
        </>
      }
    </div>
  )
}
