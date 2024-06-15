import clsx from '@/utils/clsx';
import Button from '@/components/common/Button/Button';

import classes from './StopwatchButtons.module.css';

function StopwatchButtons({
  isStoped,
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
  addLap,
}: {
  isStoped: boolean;
  startStopwatch: () => void;
  stopStopwatch: () => void;
  resetStopwatch: () => void;
  addLap: () => void;
}) {
  return (
    <div
      className={clsx(
        classes.buttons,
        '[&_ion-icon]:h-16 [&_ion-icon]:w-16 [&_ion-icon]:align-middle'
      )}
    >
      {isStoped && (
        <button
          className='bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
          onClick={startStopwatch}
        >
          <ion-icon name='play' />
        </button>
      )}
      {isStoped && (
        <button
          className='bg-orange-vivid-200 rounded-md border-none p-2 hover:bg-orange-vivid-100 duration-300 cursor-pointer'
          onClick={resetStopwatch}
        >
          <ion-icon name='refresh' />
        </button>
      )}
      {!isStoped && (
        <button
          className='bg-orange-vivid-400 rounded-md border-none p-2 hover:bg-orange-vivid-500 duration-300 cursor-pointer'
          onClick={stopStopwatch}
        >
          <ion-icon name='pause' />
        </button>
      )}
      {!isStoped && (
        <button
          className='bg-orange-vivid-200 rounded-md border-none p-2 hover:bg-orange-vivid-100 duration-300 cursor-pointer'
          onClick={addLap}
        >
          <ion-icon name='flag' />
        </button>
      )}
    </div>
  );
}

export default StopwatchButtons;
