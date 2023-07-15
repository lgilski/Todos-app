import { Outlet } from 'react-router-dom';

function TimerRoot() {
  return (
    <div className='greyBg'>
      <Outlet />
    </div>
  );
}

export default TimerRoot;
