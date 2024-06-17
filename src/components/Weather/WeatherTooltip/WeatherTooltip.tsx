import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import classes from './WeatherTooltip.module.css';
import { useState } from 'react';

function WeatherTooltip({
  city,
  favorite,
  deleteWeather,
  showOnCards,
  stopShowingOnCards,
}: {
  city: string;
  favorite: string | null;
  deleteWeather: () => void;
  showOnCards: () => void;
  stopShowingOnCards: () => void;
}) {
  //   .triggerButton,
  // .triggerButton:link,
  // .triggerButton:visited {
  //   display: inline-block;
  //   width: 32px;
  //   height: 32px;
  //   padding: 4px;
  //   cursor: pointer;
  //   background-color: var(--tint-orange-vivid-80);
  //   border: none;
  //   border-radius: 100%;
  //   transition: all 0.3s;
  // }

  // .triggerButton:hover,
  // .triggerButton:active {
  //   background-color: #fff;
  // }

  // .triggerButton ion-icon {
  //   width: 100%;
  //   height: 100%;
  // }

  return (
    <div className={classes.container}>
      <button
        className={
          'inline-block w-8 h-8 p-1 cursor-pointer border-none rounded-full [&_ion-icon]:w-full [&_ion-icon]:h-full bg-transparent'
        }
        id={city}
      >
        <ion-icon name='ellipsis-vertical' />
      </button>
      <Tooltip
        className={classes.tooltip}
        anchorSelect={`#${city}`}
        clickable
        place='right'
        openOnClick
      >
        <div className={classes.buttonsWrapper}>
          <button
            onClick={deleteWeather}
            className={classes.tooltipButton}
          >
            <ion-icon name='trash' /> <p>Delete</p>
          </button>
          <Link className={classes.tooltipButton} to={city}>
            <ion-icon name='stats-chart' /> <p>Details</p>
          </Link>
          {favorite !== city && (
            <button
              onClick={showOnCards}
              className={classes.tooltipButton}
            >
              <ion-icon name='heart' /> <p>Show on cards</p>
            </button>
          )}
          {favorite === city && (
            <button
              onClick={stopShowingOnCards}
              className={classes.tooltipButton}
            >
              <ion-icon name='heart-dislike' />
              <p> Stop showing on cards</p>
            </button>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default WeatherTooltip;
