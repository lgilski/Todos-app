import { LapTime } from '@/types';
import StopwatchTime from '../StopwatchTime/StopwatchTime';

const StopwatchLapTime = function ({
  lapTime,
}: {
  lapTime: LapTime[];
}) {
  let number = 0;

  return (
    <div className='flex flex-col gap-2 items-center mb-6 p-5 w-[95%] bg-orange-vivid-100 rounded-xl mx-auto text-3xl dark:bg-orange-vivid-200 dark:text-orange-vivid-900'>
      {lapTime.map((time) => {
        return (
          <StopwatchTime
            key={number++}
            currentHours={time.currentHours}
            currentMinutes={time.currentMinutes}
            currentSeconds={time.currentSeconds}
            currentMiliseconds={time.currentMiliseconds}
            lap={number}
          />
        );
      })}
    </div>
  );
};

export default StopwatchLapTime;
