import { useRef, useState } from 'react';

import classes from './Stopwatch.module.css';
import Button from '../../UI/Button';

function Stopwatch() {
  const stopwatchRef = useRef();

  const [time, setTime] = useState(0);
  const [isStoped, setIsStoped] = useState(true);

  const startStopwatch = function () {
    setIsStoped(false);

    stopwatchRef.current = setInterval(() => {
      setTime(prevState => prevState + 1);
    }, 10);
  };

  const stopStopwatch = function () {
    clearInterval(stopwatchRef.current);
    setIsStoped(true);
  };

  const resetStopwatch = function () {
    setTime(0);
  };

  let currentSeconds = Math.floor(time / 100);
  let currentMiliseconds = time - currentSeconds * 100;
  let currentHours = Math.floor(currentSeconds / (60 * 60));
  let currentMinutes = Math.floor(currentSeconds / 60 - currentHours * 60);

  return (
    <>
      <div className='pageTitle-center'>
        <h5 className='subheader'>Stopwatch page</h5>
        <h4 className='header'>Start counting</h4>
      </div>
      <div className={classes.stopwatch}>
        <h5 className={classes.time}>
          {currentHours.toString().length < 2
            ? `0${currentHours}`
            : currentHours}
          :
          {currentMinutes.toString().length < 2
            ? `0${currentMinutes}`
            : currentMinutes}
          :
          {currentSeconds.toString().length < 2
            ? `0${currentSeconds}`
            : currentSeconds}
          :
          {currentMiliseconds.toString().length < 2
            ? `0${currentMiliseconds}`
            : currentMiliseconds}
        </h5>
        <div className={classes.buttons}>
          {isStoped && (
            <Button
              variant='circle'
              functionality='start'
              onClick={startStopwatch}
            >
              start
            </Button>
          )}
          {!isStoped && (
            <Button
              variant='circle'
              functionality='stop'
              onClick={stopStopwatch}
            >
              stop
            </Button>
          )}
          {isStoped && (
            <Button
              variant='circle'
              functionality='reset'
              onClick={resetStopwatch}
            >
              reset
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
