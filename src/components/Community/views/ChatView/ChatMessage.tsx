import ProfileIcon from '@/components/Profile/ProfileIcon';
import { auth } from '@/config/firebase';
import formatMessageData from '@/helpers/formatMessageData';
import { Message, WholeState } from '@/types';
import { getDatabase, ref, update } from 'firebase/database';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

function ChatMessage({
  message,
  index,
  deleteMessage,
  setCurrentEditedMessage,
  currentEditedMessage,
}: {
  message: Message;
  index: number;
  deleteMessage: (message: Message) => Promise<void>;
  setCurrentEditedMessage: Dispatch<
    SetStateAction<string | undefined>
  >;

  currentEditedMessage: string | undefined;
}) {
  const user = auth.currentUser;
  const db = getDatabase();

  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const currentCombinedId = useSelector(
    (state: WholeState) => state.chat.currentCombinedId
  );
  const myMessages = useSelector(
    (state: WholeState) => state.chat.myMessages
  );
  const [editable, setEditable] = useState(false);

  const editMessage = function () {
    setEditable((prevState) => !prevState);
  };

  const setEditedMessage = function () {
    editMessage();

    if (textAreaRef.current?.innerText !== message.message)
      update(
        ref(db, 'chats/' + currentCombinedId + '/messages/' + index),
        { message: textAreaRef.current?.innerText, edited: true }
      );
  };

  const keyHandler = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setEditedMessage();
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      setEditable(false);
      textAreaRef.current!.innerText = message.message;
    }
  };

  const textAreaRef = useRef<HTMLParagraphElement>(null);

  const {
    onlyMessage,
    photo,
    sentBy,
    dateToDisplay,
    time,
    nextDiff,
  } = formatMessageData(message, myMessages, index, currentFriend);

  // Now it works
  useEffect(() => {
    if (textAreaRef && editable) {
      textAreaRef.current!.focus();

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textAreaRef.current!);
      range.collapse(false);

      selection!.removeAllRanges();
      selection!.addRange(range);
    }

    if (editable) {
      setCurrentEditedMessage(message.id);
    }
  }, [editable]);

  useEffect(() => {
    if (currentEditedMessage !== message.id) setEditable(false);
  }, [currentEditedMessage]);

  // <div
  //   role='textbox'
  //   aria-multiline='true'
  //   spellcheck='true'
  //   aria-haspopup='listbox'
  //   aria-invalid='false'
  //   aria-autocomplete='list'
  //   class='markup_d6076c editor_a552a6 slateTextArea_e52116 fontSize16Padding_d0696b textAreaWithoutAttachmentButton_d0696b'
  //   autocorrect='off'
  //   data-can-focus='true'
  //   data-slate-editor='true'
  //   data-slate-node='value'
  //   contenteditable='true'
  //   zindex='-1'
  //   style='position: relative; outline: none; white-space: pre-wrap; overflow-wrap: break-word;'
  // >
  //   <div data-slate-node='element'>
  //     <span data-slate-node='text'>
  //       <span data-slate-leaf='true' class=''>
  //         <span data-slate-string='true'>
  //           Jasne, to w takim razie jutro się zdzwonimy
  //         </span>
  //       </span>
  //     </span>
  //   </div>
  // </div>;

  return (
    <div
      className={`flex relative px-4 py-0.5 gap-2 group/message hover:bg-cool-grey-050 dark:hover:bg-cool-grey-800 ${
        myMessages[index + 1] &&
        myMessages[index + 1].sender !== message.sender &&
        'mb-4'
      } ${nextDiff! > 3 && 'mb-4'} `}
    >
      {!onlyMessage && (
        <ProfileIcon
          size='semi-medium'
          friend
          src={message.canNotSendMessage ? null : photo!}
        />
      )}
      <div className='flex flex-col gap-1'>
        {!onlyMessage && (
          <div className='flex items-baseline gap-2'>
            <div className=' dark:text-cool-grey-100 font-medium'>
              {message.canNotSendMessage ? 'Your To-dos' : sentBy}
            </div>
            <p className='text-xs text-cool-grey-400'>
              {dateToDisplay} {time}
            </p>
          </div>
        )}
        <div
          className={`flex flex-col ${
            onlyMessage && 'pl-12'
          } max-w-full`}
        >
          <div>
            <span
              suppressContentEditableWarning={true}
              contentEditable={editable}
              onKeyDown={keyHandler}
              ref={textAreaRef}
              className={`${
                editable &&
                'dark:bg-orange-vivid-800 bg-orange-vivid-100 h-auto flex items-center p-3 rounded-lg text-lg w-fit focus:outline-none break-all max-w-full'
              }`}
            >
              {message.message}
            </span>
            {message.edited && !editable && (
              <span className='text-xs dark:text-cool-grey-400 text-cool-grey-300 pl-1 cursor-default select-none'>
                (edited)
              </span>
            )}
          </div>
          {editable && (
            <div className='flex gap-3 text-sm'>
              <p className='flex gap-1'>
                press esc to
                <button
                  onClick={() => setEditable(false)}
                  className='bg-inherit border-none text-orange-vivid-500 text-sm cursor-pointer hover:underline'
                >
                  cancle
                </button>
              </p>
              <p className='flex gap-1'>
                press enter to
                <button
                  onClick={setEditedMessage}
                  className='bg-inherit border-none text-orange-vivid-500 text-sm cursor-pointer hover:underline'
                >
                  save changes
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      {message.sender === user?.uid && (
        <div className='absolute overflow-hidden rounded border border-solid border-cool-grey-850 hidden -top-4 right-4 h-7 bg-cool-grey-700 group-hover/message:flex [&_ion-icon]:h-full [&_ion-icon]:w-full'>
          <button
            onClick={editMessage}
            className='border-y-0 border-l-0 border-r border-solid border-cool-grey-900 h-full w-7 bg-inherit text-cool-grey-050 py-0.5 px-1 hover:bg-cool-grey-600 duration-300 cursor-pointer'
          >
            <ion-icon name='create-outline' />
          </button>
          <button
            onClick={() => deleteMessage(message)}
            className='h-full w-7 bg-inherit border-none text-cool-grey-050 p-1 hover:bg-cool-grey-600 hover:text-red-300 duration-300 cursor-pointer'
          >
            <ion-icon name='trash-outline' />
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
