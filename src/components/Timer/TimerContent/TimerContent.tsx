import { useSelector } from 'react-redux';
import DisplayTime from '../DisplayTime';

import classes from './TimerContent.module.css';
import Button from '../../common/Button/Button';
import { Timer, WholeState } from '@/types';

function TimerContent({
  functions,
  timerData,
  currentTime,
  isCounting,
  index,
}: {
  functions: {
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    deleteTimer: () => void;
    editTimer: () => void;
    closeModal: () => void;
  };
  timerData: Timer;
  currentTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  isCounting: boolean;
  index: number;
}) {
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );
  // const isCounting = useSelector(
  //   (state: WholeState) => state.timers.timers[index].isCounting
  // );
  const timeRemaining = useSelector(
    (state: WholeState) => state.timers.timers[index].timeRemaining
  );

  // .timerName {
  //   font-size: 24px;
  //   text-align: center;
  // }

  // .timerWrapper {
  //   display: flex;
  //   justify-content: space-between;
  // }

  // .timerTime {
  //   font-size: 64px;
  //   text-align: center;
  //   cursor: pointer;
  //   transition: all 0.3s;
  // }

  // .timerTime:hover,
  // .timerTime:active {
  //   color: var(--shade-orange-vivid-10);
  // }

  // .timerButton {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

  // @media (max-width: 580px) {
  //   .timerTime {
  //     font-size: 48px;
  //   }

  //   .timerName {
  //     font-size: 18px;
  //   }
  // }

  return (
    <div className={classes.timerWrapper}>
      <div>
        <h4
          onClick={functions.editTimer}
          className={
            'text-6xl text-center cursor-pointer duration-300 hover:text-orange-vivid-800'
          }
        >
          <DisplayTime time={currentTime.hours} />
          :
          <DisplayTime time={currentTime.minutes} />
          :
          <DisplayTime time={currentTime.seconds} />
        </h4>
        <p className={classes.timerName}>
          {timerData.timerName} (
          <DisplayTime
            time={timerData.hours.toString()}
            startingTime={true}
          />
          :
          <DisplayTime time={timerData.minutes} startingTime={true} />
          :
          <DisplayTime time={timerData.seconds} startingTime={true} />
          )
        </p>
      </div>
      {countDownMethod === 'Manually' && (
        <div
          className={
            'flex gap-6 [&_ion-icon]:w-10 [&_ion-icon]:h-10 items-center'
          }
        >
          {!isCounting && (
            <button
              color='Start'
              onClick={functions.startTimer}
              className={`bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer ${
                !timeRemaining ? 'hidden' : 'flex'
              } items-center justify-center`}
            >
              <ion-icon name='play' />
            </button>
          )}
          {isCounting && (
            <button
              onClick={functions.stopTimer}
              className={
                'bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
              }
            >
              <ion-icon name='pause' />
            </button>
          )}
          {!isCounting && (
            <button
              onClick={functions.resetTimer}
              className={
                'bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
              }
            >
              <ion-icon name='refresh' />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerContent;
