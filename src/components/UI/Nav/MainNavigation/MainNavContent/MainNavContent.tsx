import { Form } from 'react-router-dom';
import clsx from '../../../../../utils/clsx';
import NavButton from '../../../NavButton/NavButton';

import classes from './MainNavContent.module.css';
import Button from '../../../../common/Button/Button';
import { useMediaPredicate } from 'react-media-hook';
import { CSSTransition } from 'react-transition-group';
import { auth } from '../../../../../config/firebase';

function MainNavContent({
  showMobile,
  showMobileNav,
}: {
  showMobile: boolean;
  showMobileNav: () => void;
}) {
  const userVerified = auth.currentUser?.emailVerified;

  const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  // .navList {
  //   display: flex;
  //   gap: 32px;
  //   align-items: center;
  //   justify-content: space-between;
  //   list-style: none;
  // }

  // .navContainer {
  //   display: flex;
  //   justify-content: center;
  // }

  // .navListItem {
  //   position: relative;
  // }

  // .mobile {
  //   position: absolute;
  //   right: -150px;
  //   display: none;
  // }

  // .showMobile {
  //   right: 50%;
  //   z-index: 4;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 48px;
  //   transform: translate(50%, 50%);
  //   /* animation: goIn 0.3s ease-in-out; */
  // }

  // .fadeEnter {
  //   right: -100px;
  //   opacity: 0;
  // }

  // .fadeEnterActive {
  //   right: 50%;
  //   opacity: 1;
  //   transition: all 0.3s ease-in-out;
  // }

  // .fadeExit {
  //   right: 50%;
  //   z-index: 4;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 48px;
  //   opacity: 1;
  //   transform: translate(50%, 50%);
  // }

  // .fadeExitActive {
  //   right: -100px;
  //   z-index: 4;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 48px;
  //   opacity: 0;
  //   transition: all 0.3s ease-in-out;
  //   transform: translate(50%, 50%);
  // }

  return (
    // <CSSTransition
    //   classNames={{
    //     enterActive: classes['fade-enter-active'],
    //     enter: classes['fade-enter'],
    //     exitActive: classes['fade-exit-active'],
    //     exit: classes['fade-exit'],
    //   }}
    //   timeout={300}
    //   in={showMobile}
    // >
    <ul
      className={clsx(classes.navList, {
        [classes.mobile]: lessThan1100,
        [classes.showMobile]: showMobile,
      })}
    >
      {!userVerified && (
        <NavButton
          onClick={lessThan1100 ? showMobileNav : undefined}
          className={classes.navListItem}
          // to='/auth?mode=login'
          to='/auth/login'
          end={true}
        >
          Log in
        </NavButton>
      )}
      {!userVerified && (
        <NavButton
          onClick={lessThan1100 ? showMobileNav : undefined}
          className={classes.navListItem}
          // to='/auth?mode=login'
          to='/auth/signup'
          auth={true}
          end={true}
        >
          Sign up
        </NavButton>
      )}
      {userVerified && (
        <li>
          <Form action='/logout' method='post'>
            <Button
              onClick={lessThan1100 ? showMobileNav : undefined}
              variant='Logout'
              color='Logout'
            >
              Log out
            </Button>
          </Form>
        </li>
      )}
    </ul>
    // </CSSTransition>
  );
}

export default MainNavContent;
