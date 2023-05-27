import { useDispatch, useSelector } from 'react-redux';
import TimerComponent from './TimerComponent';
import { timerActions } from '../store/timer';
import { useEffect } from 'react';

function Timers() {
  const dispatch = useDispatch();

  const timers = useSelector(state => state.timers.timers);

  const formatedTimers = JSON.parse(localStorage.getItem('timers'));

  useEffect(() => {
    if (formatedTimers !== null) {
      dispatch(timerActions.setTimers(formatedTimers));
    } else {
      dispatch(timerActions.setTimers([]));
    }
  }, []);

  return (
    <>
      {timers.map(timer => (
        <TimerComponent key={timer.id} timerData={timer} />
      ))}
    </>
  );
}

export default Timers;
