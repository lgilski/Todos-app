import SectionHeader from '@/components/common/SectionHeader/SectionHeader';

function CommuntityPreview() {
  return (
    <section className='bg-orange-vivid-050  py-32'>
      <div className='max-w-[1200px] mx-auto'>
        <SectionHeader
          className='w-full pb-8 text-center'
          subheader='Community'
          header='Get in touch with your friends'
          type='large'
        />
      </div>
    </section>
  );
}

export default CommuntityPreview;
