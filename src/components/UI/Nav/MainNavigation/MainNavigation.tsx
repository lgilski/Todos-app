import classes from './MainNavigation.module.css';

import Subtitle from '../../../Home/Subtitle/Subtitle';
import { useMediaPredicate } from 'react-media-hook';
import { useEffect, useState } from 'react';
import clsx from '../../../../utils/clsx';
import { CSSTransition } from 'react-transition-group';
import MainNavContent from './MainNavContent/MainNavContent';

function MainNavigation() {
  const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  const [showMobile, setShowMobile] = useState(false);

  const showMobileNav = function () {
    setShowMobile((prevState) => !prevState);
  };

  useEffect(() => {
    if (!lessThan1100) {
      setShowMobile(false);
    }
  }, [lessThan1100]);

  // .blurElement {
  //   position: fixed;
  //   top: 0;
  //   right: -100%;
  //   z-index: 2;
  //   width: 100%;
  //   height: 100vh;
  //   /* background: rgba(0, 0, 0, 0.75); */
  //   background: rgb(239 200 166 / 95%);
  //   transition: all 0.3s;
  // }

  // .showBlur {
  //   top: 0;
  //   right: 0;
  // }

  return (
    <header
      className='flex items-center justify-between
    py-2 px-6 [&_ion-icon]:relative [&_ion-icon]:z-[3] [&_ion-icon]:w-7 [&_ion-icon]:h-7 [&_ion-icon]:p-1 [&_ion-icon]:cursor-pointer [&_ion-icon]:bg-orange-vivid-200 [&_ion-icon]:rounded-md [&_ion-icon]:duration-300 [&_ion-icon]:hover:bg-orange-vivid-400'
    >
      <Subtitle />
      <nav>
        {lessThan1100 && (
          <ion-icon
            name={showMobile ? 'close' : 'menu'}
            onClick={showMobileNav}
          />
        )}
        <MainNavContent
          showMobile={showMobile}
          showMobileNav={showMobileNav}
        />
        <div
          className={clsx(
            'fixed top-0  z-[2] w-full h-screen bg-orange-vivid-300 opacity-80 duration-300',
            showMobile ? 'right-0' : '-right-full'
          )}
        />
      </nav>
    </header>
  );
}

export default MainNavigation;
