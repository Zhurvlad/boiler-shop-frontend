import React from "react";
import {motion, AnimatePresence} from "framer-motion";
import {IAccordion} from '../../../types/common';


export const Accordion = ({children, arrowOpenClass, title,
                            titleClass, isMobileForFilters, hideArrowClass, boxShadowStyles, callback}: IAccordion) => {

  const [expanded, setExpanded] = React.useState(false)

  const toggleAccordion = () => {
    if(callback){
      callback(expanded)
    }
    setExpanded(!expanded)

  }

  return (
    <>
      {title
        ? isMobileForFilters
          ? <button className={`${titleClass} ${hideArrowClass}`}>{title}</button>
          : <motion.button
            initial={false}
            className={`${titleClass} ${expanded ? isMobileForFilters ? '' : arrowOpenClass : ''}`}
            onClick={toggleAccordion}
          >
            {title}
          </motion.button>
        : ''
      }

      <AnimatePresence initial={false}>
        {(isMobileForFilters || expanded) && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {opacity: 1, height: "auto"},
              collapsed: {opacity: 0, height: 0}
            }}
            styles={{overflow: 'hidden'}}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
