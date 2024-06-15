import { useDispatch, useSelector } from 'react-redux';

import classes from './ChoseCountDownMethod.module.css';

import { timerActions } from '../../../store/timer';
import Button from '../../common/Button/Button';

import { WholeState } from '@/types';

function TimerCountDownMethod() {
  const dispatch = useDispatch();

  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );
  const startedSequence = useSelector(
    (state: WholeState) => state.timers.startSequence
  );

  const startSequence = function () {
    dispatch(timerActions.startTimersInSquence());
  };

  const stopTimers = function () {
    dispatch(timerActions.stopTimersInSquence());
  };

  const resetTimers = function () {
    dispatch(timerActions.resetTimers(true));
  };

  const setMethod = function (
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    dispatch(timerActions.setTimerCountDownMethod(e.target.value));
    dispatch(timerActions.stopTimersInSquence());
  };

  // .wrapper {
  //   /* max-width: 500px; */
  //   /* margin: auto; */
  //   display: flex;
  //   gap: 16px;
  //   align-items: center;
  //   /* justify-content: space-between; */
  // }

  // .wrapper:not(div) .chooseCountDownType {
  //   margin: auto;
  // }

  // .chooseCountDownType {
  //   /* margin: auto; */
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-around;
  //   max-width: 250px;
  //   max-height: 75px;
  //   border-radius: 8px;
  // }

  // .chooseCountDownType select {
  //   padding: 8px;
  //   font-size: 20px;
  //   /* background-color: var(--tint-orange-vivid-80); */
  //   background-color: var(--orange-vivid-200);
  //   border: none;
  //   border-radius: 9px;
  // }

  // .btns {
  //   display: flex;
  //   gap: 8px;
  //   align-items: center;
  //   justify-content: center;
  // }

  // .btns ion-icon {
  //   width: 28px;
  //   height: 28px;
  // }

  // .btns button {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 38px;
  //   height: 38px;
  // }

  return (
    <div className={classes.wrapper}>
      <form className={classes.chooseCountDownType}>
        <div>
          <select
            className='p-2 text-lg rounded-md bg-orange-300 border-none'
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
        <div className={classes.btns}>
          {!startedSequence && (
            <button
              className='bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
              onClick={startSequence}
            >
              <ion-icon name='play' />
            </button>
          )}
          {startedSequence && (
            <button
              className='bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
              onClick={stopTimers}
            >
              <ion-icon name='pause' />
            </button>
          )}
          {!startedSequence && (
            <button
              className='bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
              onClick={resetTimers}
            >
              <ion-icon name='refresh' />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerCountDownMethod;
