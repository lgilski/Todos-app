import { useSelector } from 'react-redux';
import TimerDisplayTime from '../DisplayTime';

import classes from './TimerContent.module.css';
import Button from '../../UI/Button';

function TimerContent({ functions, timerData, isCounting, currentTime }) {
  const countDownMethod = useSelector(state => state.timers.countDownMethod);

  return (
    <div className={classes['timer-wrapper']}>
      <div>
        <h4 onClick={functions.editTimer} className={classes['timer-time']}>
          <TimerDisplayTime time={currentTime.hours} />
          :
          <TimerDisplayTime time={currentTime.minutes} />
          :
          <TimerDisplayTime time={currentTime.seconds} />
        </h4>
        <p className={classes['timer-name']}>
          {timerData.timerName} (
          <TimerDisplayTime time={timerData.hours} startingTime={true} />
          :
          <TimerDisplayTime time={timerData.minutes} startingTime={true} />
          :
          <TimerDisplayTime time={timerData.seconds} startingTime={true} />)
        </p>
      </div>
      {countDownMethod === 'Manually' && (
        <div className={classes['timer-buttons']}>
          {!isCounting && (
            <Button
              btnType='circle'
              btnFunctionality='start'
              onClick={functions.startTimer}
            >
              start
            </Button>
          )}
          {isCounting && (
            <Button
              btnType='circle'
              btnFunctionality='stop'
              onClick={functions.stopTimer}
            >
              stop
            </Button>
          )}
          {!isCounting && (
            <Button
              btnType='circle'
              btnFunctionality='reset'
              onClick={functions.resetTimer}
            >
              reset
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerContent;
