import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from '../../../styles/catalog/index.module.scss';
import {getTrackBackground, Range} from 'react-range';
import {IPriceRange} from '../../../types/catalog';
import React from 'react';

const STEP = 1
const MIN = 0
const MAX = 10000

export const PriceRange = ({priceRange, setPriceRange, setIsPriceRangeChanged}: IPriceRange) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handlePriceRangeChange = (value: number[]) => {
    setIsPriceRangeChanged(true)
    setPriceRange(value)
  }


  return (
    <div className={styles.filters__price}>
      <div  className={`${styles.filters__price__inputs} ${darkModeClass}`}>
        <input readOnly value={Math.ceil(priceRange[0])} placeholder={'от 0 '} type="text"/>
        <span className={styles.filters__price__inputs__border}/>
        <input readOnly value={Math.ceil(priceRange[1])} placeholder={'до 10000 '} type="text"/>
      </div>
      <Range
        values={priceRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePriceRangeChange}
        renderTrack={({props, children}) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "auto",
              display: "flex",
              width: "100%",
              padding: "0 10px"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: priceRange,
                  colors: ["#B1CEFA", "#247CC8", "#B1CEFA"],
                  min: MIN,
                  max: MAX
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({props}) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
          >
            <div
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '3px solid #1C629E',
                boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',
              }}
            />
          </div>
        )}
      />
    </div>

  )
}
