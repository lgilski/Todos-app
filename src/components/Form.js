import React, { useState, useRef, useEffect } from 'react';
import Button from './UI/Button';

import classes from './Form.module.css';
import { dataActions } from '../store';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @return {string} daeb7d0c-03f4-4324-af33-22f8f2098968
 */
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

function formatDate(date) {
  return date.toLocaleDateString('pl-PL'); // DD.MM.YYYY
}

const Form = function () {
  const taskInputRef = useRef();
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards);

  const onSubmit = e => {
    e.preventDefault();

    const cardId = formatDate(new Date(date));

    if (!cards.find(card => card.id === cardId)) {
      dispatch(
        dataActions.createCard({
          date: new Date(date).toISOString(),
          id: cardId,
          tasks: [],
        })
      );
    }

    const task = {
      id: generateUUID(),
      content: taskInputRef.current.value,
    };
    dispatch(dataActions.createTask({ cardId, task }));
  };

  const onDataChange = function (e) {
    setDate(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <label htmlFor='your task'>Type your plan :)</label>
      <input
        autoComplete='off'
        ref={taskInputRef}
        type='text'
        name='your task'
        required
      />
      <label htmlFor='days'>On what day will it be?</label>
      <input type='date' name='days' onChange={onDataChange} required />
      <Button type='submit'>Add</Button>
    </form>
  );
};

export default Form;
