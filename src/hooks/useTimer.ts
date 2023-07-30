import {
  useEffect,
  useState,
  useRef,
  TimeHTMLAttributes,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { timerActions } from '../store/timer';
import { Timer, WholeState } from '@/types';

// const workers = new Map<string, Worker>();

export function useTimer({
  // completeTimeInSeconds,
  timerData,
  index,
}: {
  // completeTimeInSeconds: number;
  timerData: Timer;
  index: number;
}) {
  const countDownTime: { current: NodeJS.Timeout | undefined } =
    useRef(undefined);

  const dispatch = useDispatch();

  const startSequence = useSelector(
    (state: WholeState) => state.timers.startSequence
  );
  const activeIndex = useSelector(
    (state: WholeState) => state.timers.activeIndex
  );
  const resetAllTimers = useSelector(
    (state: WholeState) => state.timers.resetAllTimers
  );
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );
  const timeRemaining = useSelector(
    (state: WholeState) => state.timers.timers[index].timeRemaining
  );
  const startingTime = useSelector(
    (state: WholeState) => state.timers.timers[index].timeInSeconds
  );
  const isCounting = useSelector(
    (state: WholeState) => state.timers.timers[index].isCounting
  );

  const [showModal, setShowModal] = useState(false);

  let now = new Date();
  const then = new Date(now.getTime() + startingTime * 1000);

  // console.log('Time remaining', timeRemaining);
  // console.log('Starting time: ', startingTime);

  const startTimer = () => {
    if (timeRemaining! === 0) {
      resetTimer();
    }

    dispatch(timerActions.startTimer({ timerId: timerData.id }));

    countDownTime.current = setInterval(() => {
      now = new Date(now.getTime() + 1000);
      if (then.getTime() - now.getTime() === 0) {
        stopTimer();
        if (countDownMethod === 'Start in sequence') {
          dispatch(timerActions.incrementActiveIndexInSequence());
          console.log('idex higher: ', activeIndex);
        }
      }

      dispatch(
        timerActions.setRemainingTime({
          timerId: timerData.id,
          timeRemaining: (then.getTime() - now.getTime()) / 1000,
        })
      );
    }, 1000);
  };

  const stopTimer = function () {
    dispatch(timerActions.stopTimer({ timerId: timerData.id }));
    clearInterval(countDownTime.current);
  };

  const resetTimer = function () {
    dispatch(
      timerActions.setRemainingTime({
        timerId: timerData.id,
        timeRemaining: startingTime,
      })
    );
  };

  const deleteTimer = function () {
    dispatch(timerActions.deleteTimer(timerData.id));
  };

  const editTimer = function () {
    if (countDownMethod === 'Start in sequence') {
      dispatch(timerActions.stopTimersInSquence());
    }

    stopTimer();
    setShowModal(true);
  };

  const closeModal = function () {
    setShowModal(false);
  };

  /////////////////////
  /////////////////////
  useEffect(() => {
    if (!startSequence) {
      stopTimer();
    } else if (index === activeIndex) {
      startTimer();
    }
  }, [activeIndex, startSequence]);
  /////////////////////
  /////////////////////

  useEffect(() => {
    if (isCounting) {
      stopTimer();
    }
  }, [countDownMethod]);

  useEffect(() => {
    if (timeRemaining! <= 0) {
      stopTimer();
    }
    if (resetAllTimers) {
      resetTimer();
      dispatch(timerActions.resetTimers(false));
    }
    // if (
    //   timeRemaining! <= 0 &&
    //   countDownMethod === 'Start in sequence' &&
    //   index === activeIndex
    // ) {
    //   console.log('Effect increment');
    //   dispatch(timerActions.incrementActiveIndexInSequence());
    // }
  }, [
    timeRemaining,
    countDownMethod,
    index,
    activeIndex,
    dispatch,
    resetAllTimers,
  ]);

  // useEffect(() => {
  //   resetTimer();
  // }, [timerData]);

  // useEffect(() => {
  //   resetTimer();
  // }, []);

  return {
    functions: {
      startTimer,
      stopTimer,
      resetTimer,
      deleteTimer,
      editTimer,
      closeModal,
    },
    showModal,
    timeRemaining,
  };
}
