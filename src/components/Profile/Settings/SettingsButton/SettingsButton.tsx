import { dataActions } from '@/store';
import { WholeState } from '@/types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function SettingsButton({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  const dispatch = useDispatch();

  const currentSettingsPage = useSelector(
    (state: WholeState) => state.data.currentSettingsPage
  );

  const setCurrnetSetting = function (e: any) {
    dispatch(dataActions.setCurrentSettingsPage(e.target.innerText));
  };

  return (
    <li>
      <button
        className={`border-none text-sm px-2 py-1 flex gap-1 [&_ion-icon]:w-5 [&_ion-icon]:h-5 items-center duration-300 transition-colors font-['Roboto'] cursor-pointer w-full text-start dark:text-cool-grey-100 ${
          currentSettingsPage === text
            ? 'bg-orange-vivid-100 hover:bg-orange-vivid-200 font-medium dark:bg-cool-grey-700 dark:hover:bg-cool-grey-600'
            : 'bg-inherit hover:bg-orange-vivid-100 dark:hover:bg-cool-grey-700'
        }`}
        onClick={setCurrnetSetting}
      >
        <ion-icon name={icon} />
        {text}
      </button>
    </li>
  );
}

export default SettingsButton;
