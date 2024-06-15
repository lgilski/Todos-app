import classes from './TimerComponent.module.css';

import ProgressBar from '../../UI/ProgressBar';
import TimerContent from '../TimerContent/TimerContent';
import { useTimer } from '../../../hooks/useTimer';
import CloseButton from '../../common/CloseButton/CloseButton';
import { Draggable } from 'react-beautiful-dnd';
import TimerForm from '../TimerForm/TimerForm';
import { Timer } from '@/types';

const TimerComponent = function ({
  timerData,
  index,
}: {
  timerData: Timer;
  index: number;
}) {
  const startingTime =
    Number(timerData.hours) * 60 * 60 +
    Number(timerData.minutes) * 60 +
    Number(timerData.seconds);

  const { functions, showModal, isCounting, timeRemaining } =
    useTimer({
      startingTime,
      timerData,
      index,
    });

  const currentHours = Math.floor(timeRemaining! / (60 * 60));
  const currentMinutes = Math.floor(
    timeRemaining! / 60 - currentHours * 60
  );
  const currentSeconds = Math.floor(
    timeRemaining! - (currentHours * 60 * 60 + currentMinutes * 60)
  );

  // .timerButtons {
  //   display: flex;
  //   gap: 10px;
  // }

  // .timerButtons button {
  //   width: 100px;
  //   height: 100px;
  //   font-size: 32px;
  //   cursor: pointer;
  //   border: none;
  //   border-radius: 100%;
  //   transition: all 0.4s;
  // }

  return (
    <Draggable
      key={timerData.id}
      draggableId={timerData.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className='relative w-full py-6 px-8 mb-8 cursor-grab bg-orange-vivid-100 rounded-md text-black dark:bg-orange-vivid-200 '
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging.toString()}
        >
          <CloseButton
            className={'absolute top-[5px] left-[5px]'}
            onClick={functions.deleteTimer}
            color='orange-vivid'
            size='big'
          />
          {showModal && (
            <TimerForm
              showFormHandler={functions.closeModal}
              modal={true}
              timerData={timerData}
              closeModal={functions.closeModal}
            />
          )}
          <TimerContent
            functions={functions}
            timerData={timerData}
            currentTime={{
              hours: currentHours,
              minutes: currentMinutes,
              seconds: currentSeconds,
            }}
            isCounting={isCounting}
            index={index}
          />
          <ProgressBar
            bgcolor={'#6c3b10'}
            completed={(timeRemaining! / startingTime) * 100}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TimerComponent;
