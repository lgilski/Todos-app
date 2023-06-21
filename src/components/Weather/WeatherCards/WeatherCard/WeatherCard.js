import { useQuery } from '@tanstack/react-query';
import classes from './WeatherCard.module.css';
import { fetchWeather } from '../../../../api';
import CloseButton from '../../../UI/CloseButton/CloseButton';
import { useDispatch } from 'react-redux';
import { weatherActions } from '../../../../store/weather';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';

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
      staleTime: 4000 * 60,
      refetchInterval: 5000 * 60,
    }
  );

  console.log(weatherData);

  useEffect(() => {
    if (weatherData?.message) {
      dispatch(weatherActions.deleteWeather(city));
      dispatch(weatherActions.setError(weatherData.message));
    }
  }, [weatherData, dispatch, city]);

  if (!weatherData) {
    return (
      <TailSpin
        height='100'
        width='100'
        color='#d87620'
        ariaLabel='tail-spin-loading'
        radius='0'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    );
  }

  const date = new Date(weatherData.current?.last_updated_epoch * 1000);

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
    <>
      {!weatherData?.message && (
        <div className={classes.weatherCard}>
          <div className={classes.info}>
            <Link className={classes.name} to={city}>
              {weatherData.location.name}
            </Link>
            <p className={classes.date}>{time}</p>
            <div className={classes.otherInfo}>
              <div className={classes.humidity}>
                <ion-icon name='water' />
                <p>{weatherData.current.humidity}%</p>
              </div>
              <div className={classes.wind}>
                <ion-icon name='flag' />
                <p>{weatherData.current.wind_kph}km/h</p>
              </div>
            </div>
          </div>
          <h5 className={classes.temp}>{weatherData.current.temp_c}&deg;C</h5>
          <div className={classes.iconWrapper}>
            <img src={weatherData.current.condition.icon} alt='icon' />
            <p className={classes.currentCondition}>
              {weatherData.current.condition.text}
            </p>
          </div>
          <CloseButton
            onClick={deleteWeather}
            className={classes.btn}
            color='orange'
            size='big'
          />
          {/* <div className={classes.follow}>
            <ion-icon name='heart-outline' />
            <ion-icon name='heart' />
          </div> */}
        </div>
      )}
    </>
  );
}

export default WeatherCard;
