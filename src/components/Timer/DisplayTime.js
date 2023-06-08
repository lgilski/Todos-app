function DisplayTime({ time, startingTime }) {
  if (startingTime) {
    return time.length === 0
      ? '00'
      : time.toString().length <= 1
      ? `0${time}`
      : time;
  }

  return time.toString().length === 1 ? `0${time}` : time;
}

export default DisplayTime;
