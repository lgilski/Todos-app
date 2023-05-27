import { useState } from 'react';
import classes from './TimerForm.module.css';
import Button from './UI/Button';
import { useDispatch } from 'react-redux';
import { timerActions } from '../store/timer';

function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function TimerForm() {
  const dispatch = useDispatch();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerName, setTimerName] = useState('Epic Timer');

  const onHoursChange = e => {
    setHours(e.target.value);
  };
  const onMinutesChange = e => {
    setMinutes(e.target.value);
  };
  const onSecondsChange = e => {
    setSeconds(e.target.value);
  };
  const onTimerNameChange = e => {
    setTimerName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const id = generateUUID();

    dispatch(
      timerActions.createTimer({ hours, minutes, seconds, id, timerName })
    );
  };

  return (
    <section className={classes.wrapper}>
      <form className={classes.timerForm} onSubmit={onSubmit}>
        <h4>Create new timer</h4>
        <ul className={classes['timerForm-list']}>
          <li className={classes['timerForm-list--time']}>
            <div className={classes['timerForm-list--time-element']}>
              <input
                min='0'
                max='99'
                type='number'
                id='hours'
                name='hours'
                onChange={onHoursChange}
              />
              <label htmlFor='hours'>hours</label>
            </div>
            <p>:</p>
            <div className={classes['timerForm-list--time-element']}>
              <input
                min='0'
                max='59'
                type='number'
                id='minutes'
                name='minutes'
                onChange={onMinutesChange}
              />
              <label htmlFor='minutes'>minutes</label>
            </div>
            <p>:</p>
            <div className={classes['timerForm-list--time-element']}>
              <input
                min='0'
                max='59'
                type='number'
                id='seconds'
                name='seconds'
                onChange={onSecondsChange}
              />
              <label htmlFor='seconds'>seconds</label>
            </div>
          </li>
          <li className={classes.border}></li>
          <li>
            <label htmlFor='timer-name'>timer name</label>
            <input
              min='0'
              onChange={onTimerNameChange}
              type='text'
              id='timer-name'
              name='timer-name'
              autoComplete='off'
            />
          </li>
        </ul>
        <Button>Add timer</Button>
      </form>
    </section>
  );
}

export default TimerForm;
