import { useDispatch } from 'react-redux';
import Input from '../../common/Input/Input';

import classes from './SearchTask.module.css';
import { dataActions } from '../../../store';
import { useRef } from 'react';

function SearchTask() {
  const ref = useRef();

  const dispatch = useDispatch();

  const searchCertainTask = function () {
    dispatch(dataActions.searchTask(ref.current.value));
  };

  return (
    <form className={classes.wrapper}>
      {/* <label></label>
      <ion-icon name='search'></ion-icon>
      <input></input> */}
      <Input
        ref={ref}
        onChange={searchCertainTask}
        text='Look for certain task'
        color='orange'
        placeholder='Find task'
      />
    </form>
  );
}

export default SearchTask;
