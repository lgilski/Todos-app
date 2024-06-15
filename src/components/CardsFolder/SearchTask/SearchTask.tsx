import { useDispatch } from 'react-redux';

// import classes from './SearchTask.module.css';
import { useRef } from 'react';
import clsx from '../../../utils/clsx';
import { cardActions } from '../../../store/card';

function SearchTask({
  className,
}: React.HTMLAttributes<HTMLFormElement>) {
  const ref = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const searchCertainTask = function () {
    dispatch(cardActions.searchTask(ref.current!.value));
  };

  return (
    <form className='max-w-[400px]'>
      <input
        className={clsx(
          'max-w-[200px] h-full p-2 text-base bg-orange-vivid-100 placeholder:text-cool-grey-600 border-none rounded-s-none rounded-e-md duration-300 max-[640px]:w-[100px]',
          className
        )}
        ref={ref}
        onChange={searchCertainTask}
        type='text'
        name='search'
        autoComplete='off'
        placeholder='Type to search...'
      />
    </form>
  );
}

export default SearchTask;
