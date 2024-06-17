import Input from '../../common/Input/Input';

import React from 'react';

import classes from './WeatherForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { weatherActions } from '../../../store/weather';
import { WholeState } from '@/types';
import { createPortal } from 'react-dom';
import clsx from '@/utils/clsx';
import CloseButton from '@/components/common/CloseButton/CloseButton';

function WeatherForm({ hideModal }: { hideModal: () => void }) {
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

  {
    /* <>
      {createPortal(
        <form
          className={clsx(
            'fixed top-[40vh] left-[50%] z-[5] flex flex-col items-start w-[400px] max-w-[500px] p-4 mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-lg translate-x-[-50%] translate-y-[-50%] max-[420px]:max-w-[300px] max-[300px]:max-w-[240px]',
            className
          )}
          onSubmit={onSubmit}
        >
          <CloseButton
            type='button'
            onClick={hideForm}
            className='absolute top-2 right-2'
            color='orange-vivid'
            size='big'
          />
          <h4 className='flex self-center mb-5 text-3xl'>
            Create card
          </h4>
          <Input
            autoComplete='off'
            name={'your task'}
            type={'text'}
            text={'Type your plan'}
            color='Green'
            ref={taskInputRef}
            required={true}
          />
          <Input
            value={date}
            name='days'
            type='date'
            onChange={onDataChange}
            color='Green'
            required={true}
            text='On what day will it be?'
          />
          <button
            type='submit'
            className='w-full mt-3 py-2 px-4 rounded-md border-none bg-orange-vivid-400 text-lg hover:bg-orange-vivid-500 cursor-pointer duration-300'
          >
            Add card
          </button>
        </form>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={hideForm}
          className={clsx('blurElement', className)}
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </> */
  }

  return (
    <>
      {createPortal(
        <form
          onSubmit={setData}
          className={
            'w-80 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-xs p-4 mx-auto bg-white rounded-md shadow-md z-10'
          }
        >
          <CloseButton
            type='button'
            onClick={hideModal}
            className='absolute top-2 right-2'
            color='orange-vivid'
            size='big'
          />
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
        </form>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div onClick={hideModal} className={clsx('blurElement')} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default WeatherForm;
