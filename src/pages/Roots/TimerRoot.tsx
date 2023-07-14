import { Outlet } from 'react-router-dom';

function TimerRoot() {
  return (
    <div className='grey-bg'>
      <Outlet />
    </div>
  );
}

export default TimerRoot;
