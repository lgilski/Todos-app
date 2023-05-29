import TimerCountDownMethod from '../components/TimerCountDownMethod';
import TimerForm from '../components/TimerForm';
import Timers from '../components/Timers';

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
