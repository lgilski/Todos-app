import TimerCountDownMethod from '../components/Timer/TimerCountDownMethod';
import TimerForm from '../components/Timer/TimerForm';
import Timers from '../components/Timer/Timers';

function TimerPage() {
  return (
    <section>
      <TimerForm />
      <TimerCountDownMethod />
      <Timers />
    </section>
  );
}

export default TimerPage;
