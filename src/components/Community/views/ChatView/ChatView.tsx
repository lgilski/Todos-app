import { auth } from '@/config/firebase';
import ProfileIcon from '../../../Profile/ProfileIcon';
import FriendsList from './FriendsList';
import useChat from '@/hooks/useChat';
import { useRef, useState } from 'react';
import { child, get, getDatabase, ref } from 'firebase/database';

function ChatView() {
  const messageRef = useRef<HTMLInputElement | null>(null);

  const {
    currentFriend,
    messages,
    requests,
    friends,
    displayAddFriendsModal,
    functions,
  } = useChat({ messageRef });

  console.log(messages);

  return (
    <div className='max-w-[95%] h-[96%] bg-white mx-auto rounded-2xl border border-solid border-grey-200 dark:border-grey-600 dark:bg-grey-900 duration-500 grid grid-cols-[300px_1fr_220px] overflow-hidden relative shadow-md'>
      {/* <div className='absolute w-full top-0 left-0 h-12 bg-green-500'>
        AAAAAAAAAA
      </div> */}
      <FriendsList
        friends={friends}
        displayAddFriendsModal={displayAddFriendsModal}
        functions={functions}
      />
      <div className='relative'>
        <div className='overflow-y-auto text-grey-100'>
          {messages &&
            messages.map((message) => {
              return (
                <div key={message.date}>
                  {/* <ProfileIcon friend src={message.pictureURL} /> */}
                  <p>{message.date}</p>
                  <p>{message.message}</p>
                </div>
              );
            })}
        </div>
        {currentFriend && (
          <form
            onSubmit={functions.sendMessage}
            className='absolute bottom-0 left-1/2 w-full -translate-x-1/2 px-4 pb-2'
          >
            <input
              ref={messageRef}
              className='w-full border-none bg-orange-200 text-lg p-1 rounded placeholder:text-orange-700'
              placeholder={`You are typing with ${currentFriend}`}
            />
          </form>
        )}
      </div>
      <div className='bg-red-100'>
        <div>
          <h1>Requests</h1>
          {requests &&
            requests.map((request) => {
              return (
                <div
                  key={request.uid}
                  className='flex items-center p-1 justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <ProfileIcon
                      size='medium'
                      friend={true}
                      src={request.photoURL}
                    />
                    <div>{request.displayName}</div>
                  </div>
                  <div className='[&_ion-icon]:w-6 [&_ion-icon]:h-6 [&_button]:border-none [&_button]:rounded-full [&_button]:p-1 [&_button]:h-8 [&_button]:dark:bg-grey-800 [&_button]:dark:text-grey-100 flex gap-1'>
                    <button
                      onClick={() =>
                        functions.acceptFriendRequest(request)
                      }
                      className='dark:hover:text-lime-green-500 hover:text-lime-green-500 duration-300 cursor-pointer'
                    >
                      <ion-icon name='checkmark' />
                    </button>
                    <button
                      onClick={() =>
                        functions.ingnoreFriendRequest(request)
                      }
                      className='dark:hover:text-red-500 hover:text-lime-green-500 duration-300 cursor-pointer'
                    >
                      <ion-icon name='close' />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ChatView;
