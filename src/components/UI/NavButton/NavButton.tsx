import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavButton.module.css';
import clsx from '../../../utils/clsx';

/**
 *
 * @param {Object} props
 * @param {string} props.to
 * @param {boolean} props.end
 * @param {boolean} props.auth
 */

function NavButton({
  to,
  end,
  className,
  auth,
  children,
  ...props
}: {
  to: string;
  end: boolean;
  auth?: boolean;
} & React.LinkHTMLAttributes<HTMLAnchorElement>) {
  //   .btn,
  // .btn:link,
  // .btn:visited {
  //   font-size: var(--text-huge);
  //   font-weight: 500;
  //   color: var(--cool-grey-600);
  //   text-decoration: none;
  //   border-radius: 6px;
  //   transition: all 0.3s;
  // }
  // .btn:hover,
  // .btn:active,
  // .btn.active:hover,
  // .btn.active:active {
  //   color: var(--orange-vivid-400);
  // }

  // .btn.active {
  //   color: var(--cool-grey-900);
  // }

  // .active::before {
  //   position: absolute;
  //   /* top: 40px; */
  //   bottom: -16px;
  //   left: 0;
  //   width: 100%;
  //   height: 3px;
  //   cursor: initial;
  //   content: '';
  //   background-color: var(--orange-vivid-500);
  // }

  // .btn.authBtn,
  // .btn.authBtn:link,
  // .btn.authBtn:visited {
  //   padding: 8px 16px;
  //   color: var(--orange-vivid-900);
  //   text-decoration: none;
  //   background-color: var(--orange-vivid-200);
  //   border: none;
  //   border-radius: 50px;
  //   transition: all 0.3s;
  // }

  // .btn.authBtn:hover,
  // .btn.authBtn:active {
  //   color: var(--orange-vivid-050);
  //   background-color: var(--orange-vivid-600);
  // }

  // before:absolute before:-bottom-4 before:left-0 before:content-[""] before:bg-orange-vivid-500 before:h-1 before:w-full

  return (
    <>
      <li className={className}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${
              isActive &&
              !auth &&
              'before:absolute before:-bottom-2 before:left-0 before:content-[""] before:bg-orange-vivid-500 before:h-1 before:w-full'
            } no-underline font-medium text-cool-grey-600 duration-300 ${
              auth
                ? 'hover:text-orange-vivid-050'
                : 'hover:text-cool-grey-300'
            } ${
              auth &&
              'py-2 px-4 text-orange-vivid-900 bg-orange-vivid-200 border-none rounded-md  hover:bg-orange-vivid-400'
            }`
          }
          end={end}
          {...props}
        >
          {children}
        </NavLink>
      </li>
    </>
  );
}

export default NavButton;
