import {IPartImagesItemProps} from '../../../types/part';
import styles from '../../../styles/part/index.module.scss'

export const PartImagesItem = ({alt, callback, src}: IPartImagesItemProps) => {

  const changeMainImage = () => callback(src)

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <img src={src} alt={alt}/>
    </li>
  )
}
