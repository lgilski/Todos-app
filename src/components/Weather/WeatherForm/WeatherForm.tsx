import Input from '../../common/Input/Input';

import React from 'react';

import classes from './WeatherForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { weatherActions } from '../../../store/weather';
import { WholeState } from '@/types';

function WeatherForm() {
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const error = useSelector(
    (state: WholeState) => state.weather.error
  );
  const weather = useSelector(
    (state: WholeState) => state.weather.data
  );

  const setData = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const city = ref.current!.value;
    dispatch(weatherActions.setError(''));

    if (weather.find((weatherData) => weatherData === city)) {
      dispatch(
        weatherActions.setError(
          'You already have weather of this city'
        )
      );
      return;
    }
    dispatch(weatherActions.createWeatherCard(city));
  };

  // .form {
  //   display: flex;
  //   flex-direction: column;
  //   max-width: 500px;
  //   padding: 16px;
  //   margin: auto;
  //   /* background-color: var(--tint-orange-vivid-20); */
  //   background-color: var(--orange-vivid-300);
  //   border-radius: 8px;
  //   box-shadow: var(--shadow-m);
  // }

  // .heading {
  //   margin-bottom: 20px;
  //   font-size: var(--heading-s);
  // }

  // .form button {
  //   align-self: center;
  //   /* align-self: flex-end; */
  //   /* max-width: 300px; */
  //   /* margin: 0 auto; */
  // }

  return (
    <form
      onSubmit={setData}
      className={
        'flex flex-col max-w-xs p-4 mx-auto bg-white rounded-md shadow-md'
      }
    >
      <h4 className={'flex self-center mb-5 text-3xl'}>
        Find your city
      </h4>
      {error && <p>{error}</p>}
      <Input
        placeholder='Type to search...'
        autoComplete='off'
        type={'text'}
        name={'city'}
        color={'Orange'}
        text={'Type city or place'}
        ref={ref}
        // value={ref.current.value}
        required={true}
      />
      <button className='w-full mt-3 py-2 px-4 rounded-md border-none bg-orange-vivid-400 text-lg hover:bg-orange-vivid-500 cursor-pointer duration-300'>
        Search city
      </button>
    </form>
  );
}

export default WeatherForm;
