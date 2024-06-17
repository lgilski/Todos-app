import { useState } from 'react';
import Button from '../../common/Button/Button';
import SearchTask from '../SearchTask/SearchTask';
import classes from './Toolbar.module.css';
import clsx from '../../../utils/clsx';
import { useDispatch } from 'react-redux';
import { cardActions } from '@/store/card';
import { useSelector } from 'react-redux';
import { WholeState } from '@/types';

function Toolbar({
  setShowForm,
}: {
  setShowForm: (a: boolean) => void;
}) {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);

  const hideHappened = useSelector(
    (state: WholeState) => state.cards.hideHappened
  );

  const showSearchHandler = function () {
    setShowSearch((prevState) => !prevState);
  };

  const showModal = function () {
    setShowForm(true);
  };

  const hideHappenedHandler = function () {
    dispatch(cardActions.setHideHappened());
  };

  // .toolbar {
  //   width: 100%;
  //   /* background-color: var(--orange-vivid-600); */
  //   /* background-color: var(--orange-vivid-200); */
  //   /* background-color: #fff; */
  //   padding: 8px 20px;
  //   border-top-left-radius: 14px;
  //   border-top-right-radius: 14px;
  // }

  // .toolbarContent {
  //   display: flex;
  //   justify-content: space-between;
  //   width: 100%;
  //   padding: 0 8px 8px;
  //   margin: auto;
  //   /* border-bottom: 2px solid var(--orange-vivid-600); */
  //   border-bottom: 1px solid var(--cool-grey-100);
  // }

  // .searchWrapper {
  //   display: flex;
  // }

  // .hideSearch {
  //   max-width: 0;
  //   padding: 0;
  //   /* display: none; */
  // }

  // .shownSearch {
  //   border-top-right-radius: 0;
  //   border-bottom-right-radius: 0;
  // }

  // .searchBtn ion-icon {
  //   width: 28px;
  //   height: 28px;
  //   font-weight: 800;
  //   vertical-align: middle;
  // }

  // .searchBtn:hover,
  // .searchBtn:active {
  //   /* background-color: var(--orange-vivid-300); */
  //   background-color: var(--orange-vivid-400);
  //   /* color: var(--orange-vivid-050); */
  // }

  // .addBtn {
  //   font-size: var(--text-big);
  //   font-weight: 600;
  //   /* border-radius: 50px;
  //   padding: 8px 12px; */
  // }

  return (
    <div className={'w-full py-2 px-5'}>
      <div className='flex justify-between pt-0 px-2 pb-2 m-auto border-x-0 border-t-0 border-b border-solid border-cool-grey-200 dark:border-cool-grey-600'>
        <div className='flex items-end'>
          <button
            className={`border-none bg-inherit text-base font-semibold text-cool-grey-500 cursor-pointer duration-300 hover:text-cool-grey-700 relative ${
              hideHappened &&
              "after:absolute after:content-[''] after:h-[2px] after:w-full after:bg-orange-vivid-500 after:-bottom-[9px] after:left-0"
            }`}
            onClick={hideHappenedHandler}
          >
            Hide old days
          </button>
        </div>
        <div className='flex gap-4'>
          <div className={'flex'}>
            <button
              onClick={showSearchHandler}
              className={clsx(
                'w-11 h-11 text-orange-vivid-900 border-none cursor-pointer bg-orange-300 rounded-md  [&_ion-icon]:w-8 [&_ion-icon]:h-8',
                showSearch && 'rounded-e-none',
                !showSearch ? 'delay-300' : ''
              )}
            >
              <ion-icon name='search-outline' />
            </button>
            <SearchTask
              className={`${!showSearch && classes.hideSearch}`}
            />
          </div>
          <button
            onClick={showModal}
            className={
              'rounded-md px-4 py-2 text-lg bg-orange-vivid-700 hover:bg-orange-vivid-800 duration-300 cursor-pointer border-none text-orange-vivid-050'
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
