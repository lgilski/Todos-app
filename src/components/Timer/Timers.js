import { useDispatch, useSelector } from 'react-redux';
import TimerComponent from './TimerComponent';
import { timerActions } from '../../store/timer';
import { useEffect } from 'react';

function Timers() {
  const dispatch = useDispatch();

  const timers = useSelector(state => state.timers.timers);
  const activeIndex = useSelector(state => state.timers.activeIndex);

  const formatedTimers = JSON.parse(localStorage.getItem('timers'));

  // timers.forEach((timer, thisArg) => console.log(thisArg));

  useEffect(() => {
    if (formatedTimers !== null) {
      dispatch(timerActions.setTimers(formatedTimers));
    } else {
      dispatch(timerActions.setTimers([]));
    }
  }, []);

  return (
    <>
      {timers.map((timer, index) => (
        <TimerComponent key={timer.id} timerData={timer} index={index} />
      ))}
    </>
  );
}

export default Timers;
