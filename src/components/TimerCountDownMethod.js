import { useDispatch, useSelector } from 'react-redux';

import classes from './TimerCountDownMethod.module.css';

import buttonClasses from './TimerComponent.module.css';

import { timerActions } from '../store/timer';

function TimerCountDownMethod() {
  const dispatch = useDispatch();

  const countDownMethod = useSelector(state => state.timers.countDownMethod);
  // const startAllTimers = useSelector(state => state.timers.startAllTimers);
  const startedSequence = useSelector(state => state.timers.startSequence);

  // const startSequence = function () {
  //   dispatch(timerActions.startTimersInSquence());
  // };

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
            <button
              className={buttonClasses['timer-buttons--start']}
              onClick={startSequence}
            >
              start
            </button>
          )}
          {startedSequence && (
            <button
              className={buttonClasses['timer-buttons--stop']}
              onClick={stopTimers}
            >
              stop
            </button>
          )}
          {!startedSequence && (
            <button
              className={buttonClasses['timer-buttons--reset']}
              onClick={resetTimers}
            >
              reset
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default TimerCountDownMethod;
