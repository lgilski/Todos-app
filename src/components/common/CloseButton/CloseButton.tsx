import React from 'react';
import clsx from '../../../utils/clsx';
import classes from './CloseButton.module.css';

function CloseButton({
  color,
  size,
  className,
  ...props
}: {
  size?: string;
  color?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // .btn {
  //   font-weight: 800;
  //   cursor: pointer;
  //   border: none;
  //   border-radius: 100%;
  //   transition: all 0.3s;
  // }

  // .big {
  //   width: 32px;
  //   height: 32px;
  //   font-size: 16px;
  // }

  // .small {
  //   width: 24px;
  //   height: 24px;
  //   font-size: 12px;
  // }

  // .orange {
  //   color: var(--tint-orange-vivid-90);
  //   background-color: var(--shade-orange-vivid-50);
  // }

  // .orange:hover,
  // .orange:active {
  //   color: var(--shade-orange-vivid-50);
  //   background-color: var(--tint-orange-vivid-90);
  // }

  // .darkBlue {
  //   color: var(--tint-blue-80);
  //   background-color: var(--shade-blue-50);
  // }

  // .darkBlue:hover,
  // .darkBlue:active {
  //   color: var(--shade-blue-50);
  //   background-color: var(--tint-blue-80);
  // }

  return (
    <button
      // className={clsx(
      //   classes.btn,
      //   color && classes[color],
      //   size && classes[size],
      //   className
      // )}
      className={clsx(
        'border-none font-extrabold cursor-pointer rounded-full text-lg w-6 h-6 bg-transparent',
        className
      )}
      {...props}
    >
      &#x2715;
    </button>
  );
}

export default CloseButton;
