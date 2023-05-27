const ProgressBar = props => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 30,
    width: '100%',
    backgroundColor: '#e0e0de',
    marginTop: 30,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    // borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s linear',
  };

  // const labelStyles = {
  //   padding: 5,
  //   color: 'white',
  //   fontWeight: 'bold',
  // };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>{/* <span style={labelStyles}></span> */}</div>
    </div>
  );
};

export default ProgressBar;
