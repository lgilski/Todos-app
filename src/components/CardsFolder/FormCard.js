import React, { useState, useRef } from 'react';
import Button from '../UI/Button';

import classes from './FormCard.module.css';
import { dataActions } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../helpers/generateUUID';

function formatDate(date) {
  return date.toLocaleDateString('pl-PL'); // DD.MM.YYYY
}

const FormCards = function () {
  const taskInputRef = useRef();
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const cards = useSelector(state => state.data.cards);

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
      <h4 className={classes['formCard-heading']}>Create card</h4>
      <label htmlFor='your task'>Type your plan :)</label>
      <input
        autoComplete='off'
        ref={taskInputRef}
        type='text'
        name='your task'
        id='your task'
        required
      />
      <label htmlFor='days'>On what day will it be?</label>
      <input
        type='date'
        name='days'
        id='days'
        onChange={onDataChange}
        required
      />
      <Button type='submit' variant='capsule' color='orange'>
        Add card
      </Button>
    </form>
  );
};

export default FormCards;
