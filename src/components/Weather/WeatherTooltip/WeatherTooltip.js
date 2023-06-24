import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import classes from './WeatherTooltip.module.css';

function WeatherTooltip({
  city,
  favorite,
  deleteWeather,
  showOnCards,
  stopShowingOnCards,
}) {
  return (
    <div className={classes.container}>
      <button className={classes.triggerButton} id={city}>
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
          <button onClick={deleteWeather} className={classes.tooltipButton}>
            <p>Delete</p> <ion-icon name='trash' />
          </button>
          <Link className={classes.tooltipButton} to={city}>
            <p>Details</p> <ion-icon name='stats-chart' />
          </Link>
          {favorite !== city && (
            <button onClick={showOnCards} className={classes.tooltipButton}>
              <p>Show on cards</p> <ion-icon name='heart' />
            </button>
          )}
          {favorite === city && (
            <button
              onClick={stopShowingOnCards}
              className={classes.tooltipButton}
            >
              <p> Stop showing on cards</p>
              <ion-icon name='heart-dislike' />
            </button>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default WeatherTooltip;
