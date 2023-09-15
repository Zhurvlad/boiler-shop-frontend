import React from 'react';
import Link from 'next/link';
import {ICrumbProps} from '../../../types/common';
import styles from '../../../styles/breadcrumbs/index.module.scss';
import {CrumbArrowSvg} from '../../elements/CrumbArrowSvg';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';


export const Crumb = ({text: defaultText, textGenerator, href, last = false}: ICrumbProps) => {

  const [text, setText] = React.useState(defaultText);

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleGenerateText = async () => {
    if (!Boolean(textGenerator)) {
      return;
    }
    const finalText = await textGenerator();
    setText(finalText);
  }

  React.useEffect(() => {
    handleGenerateText()
  }, [textGenerator]);

  if (last) {
    return <a>
              <span
                className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
                style={{marginRight: 13}}
              >
                <CrumbArrowSvg/>
              </span>
      <span className={`last-crumb ${styles.breadcrumbs__item__text}`}>{text}</span>
    </a>
  }



  return (
    <Link href={href} passHref legacyBehavior>
      <a>
              <span
                className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
                style={{marginRight: 13}}
              >
                <CrumbArrowSvg/>
              </span>
        <span className={styles.breadcrumbs__item__text}>{text}</span>
      </a>
    </Link>
  );
}
