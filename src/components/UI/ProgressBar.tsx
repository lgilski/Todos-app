const ProgressBar = ({ completed }: { completed: number }) => {
  const containerStyles = {
    height: 28,
    width: '100%',
    // backgroundColor: '#f7e4d2',
    marginTop: 16,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    // backgroundColor: bgcolor,
    // borderRadius: 'inherit',
    // textAlign: 'right',
    transition: 'width 1s linear',
  };

  // const labelStyles = {
  //   padding: 5,
  //   color: 'white',
  //   fontWeight: 'bold',
  // };

  return (
    <div
      style={containerStyles}
      className='bg-white rounded-md overflow-hidden'
    >
      <div
        style={fillerStyles}
        className='bg-orange-vivid-800 dark:bg-orange-vivid-700'
      >
        {/* <span style={labelStyles}></span> */}
      </div>
    </div>
  );
};

export default ProgressBar;
