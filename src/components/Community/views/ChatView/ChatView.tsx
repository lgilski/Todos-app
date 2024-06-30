import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';
import { Message, WholeState } from '@/types';
import { TailSpin } from 'react-loader-spinner';
import {
  ChangeEventHandler,
  ComponentProps,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MessagesList from './MessagesList';
import { Form } from 'react-router-dom';

function ChatView({
  sendMessage,
  dummy,
  deleteMessage,
  editMessage,
}: {
  sendMessage: (messageToSend: string) => Promise<void>;
  dummy: MutableRefObject<HTMLDivElement | null>;
  deleteMessage: (message: Message) => Promise<void>;
  editMessage: () => Promise<void>;
}) {
  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const isLoadingData = useSelector(
    (state: WholeState) => state.chat.isLoadingData
  );

  // const inputRef = useRef<HTMLInputElement>(null);

  const [currentMessage, setCurrentMessage] = useState<
    string | undefined
  >(undefined);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onMessageChange: ComponentProps<'input'>['onChange'] = (
    event
  ) => {
    setCurrentMessage(event.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentMessage && currentMessage?.trimEnd().length <= 0)
      return;

    sendMessage(currentMessage!);

    setCurrentMessage('');
  };

  return (
    <>
      <MessagesList
        dummy={dummy}
        deleteMessage={deleteMessage}
        isLoadingData={isLoadingData}
        // currentEditedMessage={currentEditedMessage}
        // setCurrentEditedMessage={setCurrentEditedMessage}
      />

      {currentFriend && (
        <Form
          onSubmit={onSubmit}
          className='w-full mt-auto px-4 pb-4 pt-2'
        >
          <input
            // ref={inputRef}
            // value={inputRef.current?.value}
            value={currentMessage}
            onChange={onMessageChange}
            className='w-full border-none bg-orange-vivid-200 text-lg py-1 px-2 rounded placeholder:text-orange-vivid-700 focus:outline-none'
            placeholder={`You are typing with ${currentFriend.displayName}`}
          />
        </Form>
      )}
    </>
  );
}

export default ChatView;
