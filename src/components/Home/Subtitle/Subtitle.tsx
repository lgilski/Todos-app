import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import clsx from '../../../utils/clsx';

const Subtitle = function ({ type }: { type?: string }) {
  const userVerified = auth.currentUser?.emailVerified;

  return (
    <div className='align-middle'>
      <Link
        to={!userVerified ? '/' : '/app/cards'}
        className={clsx(
          'font-extrabold text-orange-vivid-400 no-underline',
          type === 'small' ? 'text-xl' : 'text-2xl'
        )}
      >
        Your{' '}
        <span
          className={`text-cool-grey-900 ${
            userVerified && 'dark:text-gray-50'
          }`}
        >
          To-dos
        </span>
      </Link>
    </div>
  );
};

export default Subtitle;
