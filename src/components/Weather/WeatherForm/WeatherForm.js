// import { Form } from 'react-router-dom';
import Input from '../../UI/Input/Input';

import classes from './WeatherForm.module.css';
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { weatherActions } from '../../../store/weather';
import { useState } from 'react';

function WeatherForm() {
  const ref = useRef();

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const setData = async function (e) {
    e.preventDefault();

    const city = ref.current.value;
    setError(null);
    dispatch(weatherActions.createWeatherCard(city));
  };

  return (
    <form onSubmit={setData} className={classes.form}>
      <h4 className={classes.heading}>Find your city</h4>
      {error && <p>{error}</p>}
      <Input
        autoComplete='off'
        type={'text'}
        name={'city'}
        color={'orange'}
        text={'Type city :>'}
        ref={ref}
        // value={ref.current.value}
        required={true}
      />
      <Button variant='capsule' color='orange'>
        Find city
      </Button>
    </form>
  );
}

export default WeatherForm;
