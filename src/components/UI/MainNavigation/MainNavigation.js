import { Form, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import Subtitle from '../Subtitle/Subtitle';
import { useMediaPredicate } from 'react-media-hook';
import NavButton from '../NavButton/NavButton';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import clsx from '../../../utils/clsx';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import CloseButton from '../CloseButton/CloseButton';

function Blur({ showMobileNav }) {
  return createPortal(
    <div onClick={showMobileNav} className={classes.blur} />,
    document.getElementById('overlay-root')
  );
}

function MainNavigation() {
  const { token } = useRouteLoaderData('root');

  const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  const [showMobile, setShowMobile] = useState(false);

  const showMobileNav = function () {
    setShowMobile(prevState => !prevState);
  };

  useEffect(() => {
    if (!lessThan1100) {
      setShowMobile(false);
    }
  }, [lessThan1100]);

  return (
    <header className={classes.wrapper}>
      <Subtitle />
      <nav>
        {lessThan1100 && (
          <ion-icon
            name={showMobile ? 'close' : 'menu'}
            onClick={showMobileNav}
          />
        )}
        <CSSTransition
          classNames={{
            enterActive: classes['fade-enter-active'],
            enter: classes['fade-enter'],
            exitActive: classes['fade-exit-active'],
            exit: classes['fade-exit'],
          }}
          timeout={300}
          in={showMobile}
        >
          <ul
            className={clsx(
              classes.navList,
              lessThan1100 && classes.mobile,
              showMobile && classes.showMobile
            )}
          >
            <NavButton className={classes.navListItem} to='/' end={true}>
              Home
            </NavButton>
            <NavButton className={classes.navListItem} to='/cards' end={true}>
              Cards
            </NavButton>
            <NavButton className={classes.navListItem} to='/timer' end={false}>
              Timer
            </NavButton>
            <NavButton className={classes.navListItem} to='/weather' end={true}>
              Weather
            </NavButton>
            {!token && (
              <NavButton
                className={classes.navListItem}
                to='/auth?mode=login'
                auth={true}
                end={true}
              >
                Log In
              </NavButton>
            )}
            {token && (
              <li>
                <Form action='/logout' method='post'>
                  <Button variant='logout' color='logout'>
                    Log out
                  </Button>
                </Form>
              </li>
            )}
          </ul>
        </CSSTransition>
        <CSSTransition
          classNames={{
            enterActive: classes['fade-enter-active-blur'],
            enter: classes['fade-enter-blur'],
            exitActive: classes['fade-exit-active-blur'],
            exit: classes['fade-exit-blur'],
          }}
          timeout={300}
          in={showMobile}
        >
          <div className={clsx(classes.blur, showMobile && classes.showBlur)} />
        </CSSTransition>
      </nav>
    </header>
  );
}

export default MainNavigation;
