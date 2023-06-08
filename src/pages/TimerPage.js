import TimerCountDownMethod from '../components/Timer/ChoseCountDownMethod/ChoseCountDownMethod';
import TimerForm from '../components/Timer/TimerForm/TimerForm';
import Timers from '../components/Timer/Timers';

function TimerPage() {
  return (
    <section>
      <div className='pageTitle-center-partly'>
        <div>
          <h5 className='subheader'>Timers page</h5>
          <h4 className='header'>Measure time as you like</h4>
        </div>
      </div>
      <TimerForm />
      <TimerCountDownMethod />
      <Timers />
    </section>
  );
}

export default TimerPage;
