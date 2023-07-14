function DisplayTime({
  time,
  startingTime,
}: {
  time: string | number;
  startingTime?: boolean;
}) {
  if (startingTime) {
    return time.toString().length === 0
      ? '00'
      : time.toString().length <= 1
      ? `0${time}`
      : time;
  }

  return time.toString().length === 1 ? `0${time}` : time;
}

export default DisplayTime;
