import Timers from '../components/Timer/Timers/Timers';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';

function TimerPage() {
  return (
    <section className='greyBg pb-16 pt-32 mt-0'>
      {/* <div className='pageTitleCenterPartly paddingTop'>
        <SectionHeader
          subheader='Timers page'
          header='Measure time as you like'
          type='medium'
        />
      </div> */}
      <Timers />
    </section>
  );
}

export default TimerPage;
