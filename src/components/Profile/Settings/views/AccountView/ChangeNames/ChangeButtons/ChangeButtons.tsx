function ChangeButtons() {
  return (
    <div className='ml-6 flex items-end gap-2'>
      <button
        type='reset'
        className='bg-inherit border-0 dark:text-cool-grey-200 text-base leading-none p-1 underline hover:text-orange-vivid-600 cursor-pointer duration-300 dark:hover:text-orange-vivid-600'
      >
        Reset
      </button>
      <button
        type='submit'
        className='border-0 text-base leading-none p-1 bg-orange-vivid-200 rounded-md text-orange-vivid-800 duration-300 cursor-pointer hover:bg-orange-vivid-300'
      >
        Save
      </button>
    </div>
  );
}

export default ChangeButtons;
