import React, {useState} from 'react';
import {useStore} from 'effector-react';

import {$boilerPart} from '../../../context/boilerPart';
import {$mode} from '../../../context/mode';
import {$shoppingCart} from '../../../context/shopping-cart';

import {formatPrice} from '../../../utils/common';

import {CartHoverCheckedSvg} from '../../elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import {CartHoverSvg} from '../../elements/CartHover/CartHover';
import {PartImagesList} from '../../modules/PartPage/PartImagesList';

import styles from '../../../styles/part/index.module.scss';
import spinnerStyles from '../../../styles/spinner/index.module.scss'
import {toggleCartItem} from '../../../utils/shopping-cart';
import {$user} from '../../../context/user';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {PartTabs} from '../../modules/PartPage/PartTabs';
import {DashboardSlider} from '../../modules/DashboardPage/DashboardSlider';
import {toast} from 'react-toastify';
import {getBoilerPartsFx} from '../../../app/api/boilerParts';
import {$boilerParts, setBoilerParts, setBoilerPartsByPopularityFirst} from '../../../context/boilerParts';
import {setTimeout} from 'timers';
import {PartPageAccordion} from '../../modules/PartPage/PartPageAccordion';
import {removeFromCartFx} from '../../../app/api/shopping-cart';


export const PartPage = () => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const boilerPart = useStore($boilerPart)
  const boilerParts = useStore($boilerParts)
  const cartItems = useStore($shoppingCart)
  const user = useStore($user)
  const isMobile850 = useMediaQuery(850)
  const isInCart = cartItems.some((i) => i.partId === boilerPart.id)
  const spinnerAddToCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getBoilerPartsFx.pending)

  const addToCart = () => toggleCartItem(user.username, boilerPart.id, isInCart)



  React.useEffect(() => {
    loadBoilerParts()
  },[])

  const loadBoilerParts = async () => {
    try {

      const data = await  getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      setBoilerParts(data)
      setBoilerPartsByPopularityFirst()
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <section>
      <div className={'container'}>
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2>{boilerPart.name}</h2>
          <div className={styles.part__inner}>
            <PartImagesList/>
            <div className={`${styles.part__info} ${darkModeClass}`}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.price || 0)} P
              </span>
              <span className={styles.part__info__stock}>
                {boilerPart.in_stocks
                  ? (
                    <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                  ) : (
                    <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                  )}
              </span>
              <span className={styles.part__info__code}>
                Артикул: {boilerPart.vendor_code}
              </span>
              <button className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''}`} onClick={addToCart}>
                {spinnerAddToCart
                  ? <span className={spinnerStyles.spinner} style={{top: 10, left: '45%'}}/>
                  : <>
                  <span className={styles.part__info__btn__icon}>
                    {isInCart ? <CartHoverCheckedSvg/> : <CartHoverSvg/>}
                  </span>
                    {isInCart
                      ? (
                        <span>
                        Добавлено в корзину
                      </span>
                      ) : (
                        <span>
                          Добавить в корзину
                        </span>
                      )
                    }
                  </>}
              </button>
              {!isMobile850 && <PartTabs/>}
            </div>
          </div>
        </div>
        {isMobile850 && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartPageAccordion  title={"Описание"}>
                <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                  <h3 className={`${styles.part__tabs__content__title} ${darkModeClass}`}>{boilerPart.name}</h3>
                  <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>{boilerPart.description}</p>
                </div>
              </PartPageAccordion>
            </div>
            <PartPageAccordion title={"Совместимость"}>
              <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>{boilerPart.compatibility}</p>
              </div>
            </PartPageAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider goToPartPage items={boilerParts.rows || []} spinner={spinnerSlider}/>
        </div>
      </div>
    </section>
  )
}
