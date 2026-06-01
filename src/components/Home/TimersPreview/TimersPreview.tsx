import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import timersPreview from '/src/assets/images/Screenshot_5_1.png';

import timersPreviewTwo from '/src/assets/images/Screenshot_6_1.png';

function TimersPreview() {
  return (
    <section className='bg-orange-vivid-050   py-32'>
      <div className='max-w-[1200px] mx-auto'>
        <SectionHeader
          className='w-full py-8 text-center'
          subheader='Timers'
          header='Measure your time'
          type='large'
        />
        <div className='flex items-center gap-12'>
          <div className='w-full gap-8'>
            <h3>Manual mode</h3>
            <p>
              Thank&apos;s to the manual mode you can turn your timers
              on simultaneously as you like
            </p>
            <h3>Sequence mode</h3>
            <p>In this mode your timers start one after another.</p>
            <p>
              In both modes you can drag and arange your timers. What
              is more you can always edit them
            </p>
          </div>
          <div className='relative w-full'>
            {/* <img
            src={timersPreviewTwo}
            className='scale-75 shadow-md absolute top-0'
            />
            <img
            src={timersPreview}
            className='scale-75 shadow-md absolute top-0 left-0'
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimersPreview;
