import { useQuery } from '@tanstack/react-query';
import WeatherDetailCard from './WeatherDetailCard/WeatherDetailCard';
import { fetchForecast } from '../../../api';

import classes from './WeatherDetailCards.module.css';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param {Object} props
 * @param {string} props.city
 */

function WeatherDetailCards({ city }) {
  // console.log(weatherForecast);

  const navigate = useNavigate();

  const { data: forecastData } = useQuery(
    ['forecast', city],
    () => fetchForecast({ city }),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 12,
    }
  );

  if (!forecastData) {
    return <p>Loading...</p>;
  }

  const goBack = function () {
    navigate(-1);
  };

  return (
    <>
      <div className={classes.detailWrapper}>
        <div className={classes.headerWrapper}>
          <h4 className={classes.city}>
            {forecastData.location.name}, {forecastData.location.country}
          </h4>
          <Button onClick={goBack} color='orangeLight' variant='roundedSquare'>
            <ion-icon name='arrow-back-outline' /> Back
          </Button>
        </div>
        {forecastData.forecast.forecastday.map(forecastday => {
          return (
            <WeatherDetailCard
              key={forecastday.date}
              weatherForecastDay={forecastday}
            />
          );
        })}
      </div>
    </>
  );
}

export default WeatherDetailCards;
