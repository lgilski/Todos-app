import React, { useState } from 'react';
import classes from './TimerForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { timerActions } from '../../../store/timer';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../common/Input/Input';
import { createPortal } from 'react-dom';
import CloseButton from '../../common/CloseButton/CloseButton';
import { Timer } from '@/types';

function TimerForm({
  modal,
  timerData,
  showFormHandler,
  closeModal,
}: {
  modal: boolean;
  timerData?: Timer;
  showFormHandler?: () => void;
  closeModal?: () => void;
}) {
  const dispatch = useDispatch();

  const timerId = timerData?.id;

  const [hours, setHours] = useState(timerData?.hours || 0);
  const [minutes, setMinutes] = useState(timerData?.minutes || 0);
  const [seconds, setSeconds] = useState(timerData?.seconds || 0);
  const [timerName, setTimerName] = useState(
    timerData?.timerName || 'Epic Timer'
  );

  const onHoursChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setHours(e.target.value);
  };
  const onMinutesChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setMinutes(e.target.value);
  };
  const onSecondsChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSeconds(e.target.value);
  };
  const onTimerNameChange = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    setTimerName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modal && closeModal && timerId) {
      dispatch(
        timerActions.editTimer({
          hours,
          minutes,
          seconds,
          timeInSeconds:
            Number(hours) * 60 * 60 +
            Number(minutes) * 60 +
            Number(seconds),
          timerId,
          timerName,
        })
      );

      closeModal();
      return;
    }

    const id = generateUUID();

    dispatch(
      timerActions.createTimer({
        hours,
        minutes,
        seconds,
        isCounting: false,
        timeInSeconds:
          Number(hours) * 60 * 60 +
          Number(minutes) * 60 +
          Number(seconds),
        timeRemaining:
          Number(hours) * 60 * 60 +
          Number(minutes) * 60 +
          Number(seconds),
        id,
        timerName,
      })
    );
  };

  // .wrapper {
  //   position: fixed;
  //   top: 30vh;
  //   left: 50%;
  //   z-index: 100;
  //   z-index: 5;
  //   width: 400px;
  //   max-width: 1400px;
  //   /* margin: 64px auto 32px; */
  //   margin: 0 auto 32px;
  //   overflow: hidden;
  //   border-radius: 8px;
  //   transform: translate(-50%, -50%);
  // }

  // .timerFormHeading {
  //   font-size: var(--heading-s);
  // }

  // .timerFormList {
  //   list-style: none;
  // }

  // .timerFormList li {
  //   display: flex;
  //   flex-direction: column;
  // }

  // .timerFormList input {
  //   width: 200px;
  // }

  // .timerFormList label {
  //   margin: 4px 0;
  // }

  // .timerFormList input[type='number'] {
  //   width: 80px;
  // }

  // .timerFormList input[type='text'] {
  //   margin-bottom: 20px;
  // }

  // .timerForm button {
  //   align-self: flex-end;
  // }

  // .closeBtn {
  //   position: absolute;
  //   top: 8px;
  //   right: 8px;
  // }

  // li.timerFormListTime {
  //   flex-direction: row;
  //   gap: 10px;
  //   margin-top: 20px;
  // }

  // .timerFormListTime > p {
  //   font-size: var(--text-huge);
  //   transform: translateY(5px);
  // }

  // .timerFormListTime label {
  //   display: flex;
  //   justify-content: center;
  // }

  // .border {
  //   margin: 30px 0;
  //   border-bottom: 3px solid var(--shade-orange-vivid-20);
  // }

  // .timerForm {
  //   display: flex;
  //   flex-direction: column;
  //   max-width: 500px;
  //   padding: 16px;
  //   margin: auto;
  //   font-size: var(--text-big);
  //   /* background-color: var(--tint-orange-vivid-20); */
  //   background-color: var(--orange-vivid-300);
  //   border-radius: 8px;
  //   box-shadow: var(--shadow-m);
  // }

  return (
    <>
      {createPortal(
        <div
          className={`fixed top-1/2 left-1/2 z-10 max-w-md mx-auto rounded-md -translate-x-1/2 -translate-y-1/2 bg-white`}
        >
          <form
            className={'flex flex-col p-4 mx-auto'}
            onSubmit={onSubmit}
          >
            <CloseButton
              type='button'
              onClick={showFormHandler}
              className={classes.closeBtn}
              color='orange-vivid'
              size='big'
            />
            <h4 className={'flex self-center mb-5 text-3xl'}>
              {modal ? 'Edit timer' : 'Create timer'}
            </h4>
            <ul className={'list-none flex flex-col gap-4 mb-4'}>
              <li className={'flex gap-2 justify-center'}>
                <div className={'block'}>
                  <Input
                    color='Orange'
                    down={false}
                    name='hours'
                    type='number'
                    min='0'
                    max='99'
                    onChange={onHoursChange}
                    defaultValue={modal ? timerData!.hours : ''}
                    text='Hours'
                    noMargin={true}
                  />
                </div>
                <p className='mt-8'>:</p>
                <div className={''}>
                  <Input
                    color='Orange'
                    down={false}
                    name='minutes'
                    type='number'
                    min='0'
                    max='59'
                    onChange={onMinutesChange}
                    defaultValue={modal ? timerData!.minutes : ''}
                    text='Minutes'
                    noMargin={true}
                  />
                </div>
                <p className='mt-8'>:</p>
                <div className={''}>
                  <Input
                    color='Orange'
                    down={false}
                    name='seconds'
                    type='number'
                    min='0'
                    max='59'
                    onChange={onSecondsChange}
                    defaultValue={modal ? timerData!.seconds : ''}
                    text='Seconds'
                    noMargin={true}
                  />
                </div>
              </li>
              {/* <li className={classes.border} /> */}
              <li>
                <Input
                  color='Orange'
                  name='name'
                  type='text'
                  onChange={onTimerNameChange}
                  text='Timer name'
                  noMargin={true}
                  maxLength={20}
                  autoComplete='off'
                  defaultValue={modal ? timerData!.timerName : ''}
                />
              </li>
            </ul>
            <button className='w-full mt-3 py-2 px-4 rounded-md border-none bg-orange-vivid-400 text-lg hover:bg-orange-vivid-500 cursor-pointer duration-300'>
              {modal ? 'Save' : 'Add timer'}
            </button>
          </form>
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div onClick={showFormHandler} className='blurElement' />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default TimerForm;
