import { auth } from '@/config/firebase';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ChangeButtons from './ChangeButtons/ChangeButtons';
import {
  child,
  getDatabase,
  ref,
  get,
  update,
  onValue,
} from 'firebase/database';

function ChangeNames() {
  const [userName, setUserName] = useState<string | null>(null);

  const db = getDatabase();

  const userNameRef = ref(
    db,
    'usersPublicData/' + auth!.currentUser!.uid + '/userName'
  );

  const user = auth.currentUser;

  const [saveDisplayName, setSaveDisplayName] =
    useState<boolean>(false);
  const [saveUsersName, setSaveUsersName] = useState<boolean>(false);

  const showSaveDisplayName = function () {
    setSaveDisplayName(true);
  };

  const showSaveUserName = function () {
    setSaveUsersName(true);
  };

  const submitDisplayName = function (e: any) {
    e.preventDefault();
    e.target[0].blur();

    if (e.target[0].value.length === 0) {
      return;
    }

    setSaveDisplayName(false);

    if (e.target[0].value === user?.displayName) return;

    updateProfile(user!, {
      displayName: e.target[0].value,
    });

    update(ref(db, 'usersPublicData/' + user!.uid), {
      displayName: e.target[0].value,
    });
  };

  const resetDisplayName = function (e: any) {
    e.preventDefault();

    setSaveDisplayName(false);

    e.target[0].value = user?.displayName;
  };

  const submitUserName = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    e.target[0].blur();

    if (e.target[0].value.length === 0) {
      return;
    }

    const snapshot = await get(child(ref(db), 'usersPublicData/'));

    const checkUserNames = snapshot.forEach((publicUserData) => {
      if (publicUserData.key === user!.uid) {
        return;
      } else if (publicUserData.val().userName === e.target[0]) {
        return true;
      }
    });

    if (checkUserNames) {
      return;
    }

    setSaveUsersName(false);

    await update(ref(db, 'usersPublicData/' + user!.uid), {
      userName: e.target[0].value,
    });
  };

  useEffect(() => {
    onValue(userNameRef, (snapshot) => {
      const data = snapshot.val();
      setUserName(data);
    });
  }, []);

  return (
    <div className='flex flex-col gap-2 mt-4 w-96'>
      <form
        className='flex gap-2'
        onSubmit={submitDisplayName}
        onReset={resetDisplayName}
      >
        <div className='flex flex-col'>
          <label
            className='text-sm font-medium '
            htmlFor='displayName'
          >
            Display name
          </label>
          <input
            maxLength={32}
            defaultValue={user!.displayName || ''}
            className={`mt-1 py-1 px-2 w-52 rounded border border-lime-green-700 text-sm bg-lime-green-100 dark:border-lime-green-050`}
            type='text'
            id='displayName'
            name='displayName'
            placeholder='none'
            autoComplete='off'
            onChange={showSaveDisplayName}
          />
        </div>
        {saveDisplayName && <ChangeButtons />}
      </form>
      <form className='flex gap-2' onSubmit={submitUserName}>
        <div className='flex flex-col'>
          <label
            className='text-sm font-medium mt-4'
            htmlFor='userName'
          >
            User&apos;s name
          </label>
          <input
            maxLength={32}
            defaultValue={userName || ''}
            className={`mt-1 py-1 px-2 w-52 rounded border border-lime-green-700 text-sm bg-lime-green-100 dark:border-lime-green-050 lowercase`}
            type='text'
            id='userName'
            name='userName'
            placeholder='none'
            autoComplete='off'
            onChange={showSaveUserName}
          />
        </div>
        {saveUsersName && <ChangeButtons />}
      </form>
    </div>
  );
}

export default ChangeNames;
