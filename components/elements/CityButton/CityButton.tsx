import React from 'react';

import {LocationSvg} from '../LocationSvg/LocationSvg';

import styles from '../../../styles/cityButton/index.module.scss'
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import {$userCity, setUserCity} from '../../../context/user';
import {toast} from 'react-toastify';
import {getGeolocationFx} from '../../../app/api/gealocation';
import spinnerStyles from '../../../styles/spinner/index.module.scss'


export const CityButton = () => {

  const mode = useStore($mode)
  const {city} = useStore($userCity)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinner = useStore(getGeolocationFx.pending)

  const getCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    }

    const success = async (pos: GeolocationPosition) => {
      try {

        const {longitude, latitude} = pos.coords

        const {data} = await getGeolocationFx({longitude, latitude})
        setUserCity({
          city: data.features[0].properties.city,
          street: data.features[0].properties.address_line1,
        })

      } catch (e) {
        toast.error(e.message)
      }
    }


    const error = (error: GeolocationPositionError) => toast.error(`${error.code} ${error.message}`)

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <button className={styles.city} onClick={getCity}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>
        {spinner ? (
          <span
            className={spinnerStyles.spinner}
            style={{ top: '-10px', left: 10, width: 20, height: 20 }}
          />
        ) : city.length ? (
          city
        ) : (
          'Город'
        )}
      </span>
    </button>
  )
}
