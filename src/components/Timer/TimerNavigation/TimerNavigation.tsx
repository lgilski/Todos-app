import { NavLink } from 'react-router-dom';

import classes from './TimerNavigation.module.css';

function TimerNavigation() {
  return (
    <nav className={classes.timerNavigation}>
      <ul className={classes['timerNavigationList']}>
        <li className={classes['timerNavigationListElement']}>
          <NavLink
            to='/app/timer'
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            All timers
          </NavLink>
        </li>
        <li className={classes['timerNavigationListElement']}>
          <NavLink
            to='/app/timer/stopwatch'
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Stopwatch
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TimerNavigation;
