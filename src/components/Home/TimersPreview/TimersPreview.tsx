import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import timersPreview from '/src/assets/images/Screenshot_5_1.png';

import timersPreviewTwo from '/src/assets/images/Screenshot_6_1.png';
import HomePageFeature from '../HomePageFeature';

function TimersPreview() {
  return (
    <section className='bg-orange-vivid-050  py-32'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='flex gap-24 w-full'>
          <div className='w-full'>
            <SectionHeader
              className='w-full pb-8 '
              subheader='Timers'
              header='Measure your time'
              type='large'
            />
            <div className='flex flex-col w-full gap-8'>
              <HomePageFeature
                dark
                header='Manual mode and sequence mode'
                icon='timer'
                text='Thanks to the manual mode you can turn your timers on
              simultaneously as you like. In sequence mode your timers start one after another so you can plan ahead.'
              />
              <HomePageFeature
                dark
                header='Drag and drop'
                icon='swap-horizontal'
                text='In both modes you can drag and arange your timers.'
              />
              <HomePageFeature
                dark
                header='Stopwatch'
                icon='stopwatch'
                text='Moreover, you can also use a stopwatch.'
              />
            </div>
          </div>
          <div className='relative w-full'>
            <img
              src={timersPreviewTwo}
              className='aspect-auto w-full shadow-md'
            />
            {/* <img
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
