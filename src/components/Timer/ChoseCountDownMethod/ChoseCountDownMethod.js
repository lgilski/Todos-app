import { useDispatch, useSelector } from 'react-redux';

import classes from './ChoseCountDownMethod.module.css';

import buttonClasses from '../TimerContent/TimerContent.module.css';

import { timerActions } from '../../../store/timer';
import Button from '../../UI/Button';

function TimerCountDownMethod() {
  const dispatch = useDispatch();

  const countDownMethod = useSelector(state => state.timers.countDownMethod);
  const startedSequence = useSelector(state => state.timers.startSequence);

  const startSequence = function () {
    dispatch(timerActions.startTimersInSquence());
  };

  const stopTimers = function () {
    dispatch(timerActions.stopTimersInSquence());
  };

  const resetTimers = function () {
    dispatch(timerActions.resetTimers(true));
  };

  const setMethod = function (e) {
    dispatch(timerActions.setTimerCountDownMethod(e.target.value));
    dispatch(timerActions.stopTimersInSquence());
  };

  return (
    <section className={classes.wrapper}>
      <form className={classes.chooseCountDownType}>
        <div>
          <select
            defaultValue={countDownMethod}
            onChange={setMethod}
            id='countDownType'
            name='countDownType'
          >
            <option>Manually</option>
            <option>Start in sequence</option>
          </select>
        </div>
      </form>
      {countDownMethod === 'Start in sequence' && (
        <div className={buttonClasses['timer-buttons']}>
          {!startedSequence && (
            <Button
              varaint='circle'
              functionality='start'
              onClick={startSequence}
            >
              start
            </Button>
          )}
          {startedSequence && (
            <Button varaint='circle' functionality='stop' onClick={stopTimers}>
              stop
            </Button>
          )}
          {!startedSequence && (
            <Button
              varaint='circle'
              functionality='reset'
              onClick={resetTimers}
            >
              reset
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

export default TimerCountDownMethod;
