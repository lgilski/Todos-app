import { TailSpin } from 'react-loader-spinner';
import ChatMessage from './ChatMessage';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Message, WholeState } from '@/types';
import { useSelector } from 'react-redux';

export default function MessagesList({
  dummy,
  isLoadingData,
  deleteMessage,
}: {
  dummy: MutableRefObject<HTMLDivElement | null>;
  deleteMessage: (message: Message) => Promise<void>;

  isLoadingData: boolean;
}) {
  const myMessages = useSelector(
    (state: WholeState) => state.chat.myMessages
  );

  const [currentEditedMessage, setCurrentEditedMessage] =
    useState<string>();

  return (
    <>
      {myMessages.length > 0 && (
        // h-[740px]
        <div
          // onScroll={functions.handleScroll}
          className='flex grow basis-0 flex-col dark:text-cool-grey-200 overflow-y-scroll min-h-0 mb-2 ml-2 pt-4'
        >
          {isLoadingData && (
            <TailSpin
              height='100'
              width='100'
              color='#d87620'
              ariaLabel='tail-spin-loading'
              radius='0'
              wrapperStyle={{}}
              wrapperClass='m-auto align-middle'
            />
          )}

          {!isLoadingData &&
            myMessages.map((message, index) => {
              return (
                <ChatMessage
                  index={index}
                  message={message}
                  key={message.date}
                  deleteMessage={deleteMessage}
                  setCurrentEditedMessage={setCurrentEditedMessage}
                  currentEditedMessage={currentEditedMessage}
                />
              );
            })}
          <div ref={dummy} />
        </div>
      )}
    </>
  );
}
