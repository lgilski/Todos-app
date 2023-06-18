import { useQuery } from '@tanstack/react-query';
import classes from './WeatherCard.module.css';
import { fetchWeather } from '../../../../api';
import CloseButton from '../../../UI/CloseButton/CloseButton';
import { useDispatch } from 'react-redux';
import { weatherActions } from '../../../../store/weather';

/**
 *
 * @param {Object} props
 * @param {string} props.city
 */

function WeatherCard({ city }) {
  const dispatch = useDispatch();

  const { data: weatherData } = useQuery(
    ['weather', city],
    () => fetchWeather({ city }),
    {
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
      refetchInterval: 2000 * 60,
    }
  );

  if (!weatherData) {
    return <>Loading...</>;
  }

  const date = new Date(weatherData.current.last_updated_epoch * 1000);

  const time = date.toLocaleTimeString('eng-UK', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });

  const deleteWeather = function () {
    dispatch(weatherActions.deleteWeather(city));
  };

  return (
    <div className={classes.weatherCard}>
      <div className={classes.info}>
        <p className={classes.name}>{weatherData.location.name}</p>
        <p className={classes.date}>{time}</p>
        <h5 className={classes.temp}>{weatherData.current.temp_c}&deg;C</h5>
      </div>
      <div className={classes.iconWrapper}>
        <img src={weatherData.current.condition.icon} alt='icon' />
        <p>{weatherData.current.condition.text}</p>
      </div>
      <CloseButton
        onClick={deleteWeather}
        className={classes.btn}
        color='orange'
        size='big'
      />
    </div>
  );
}

export default WeatherCard;
