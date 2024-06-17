import { useSelector } from 'react-redux';
import WeatherCard from '../WeatherCard/WeatherCard';

import classes from './WeatherCards.module.css';
import { WholeState } from '@/types';

function WeatherCards({ showModal }: { showModal: () => void }) {
  const weather = useSelector(
    (state: WholeState) => state.weather.data
  );

  return (
    <div>
      {weather.length > 0 && (
        <div className={classes.weatherCards}>
          {weather.map((city) => {
            return <WeatherCard key={city} city={city} />;
          })}
        </div>
      )}
      {weather.length <= 0 && (
        <div className='text-center py-20'>
          <h4 className='p-4 text-5xl text-cool-grey-800 dark:text-white rounded-lg '>
            There are no forcasts yet
          </h4>
          <p className='text-lg mb-6 dark:text-cool-grey-400'>
            So why don&apos;t you search for one?
          </p>
          <button
            onClick={showModal}
            color='Green'
            className='rounded-md border-none px-4 py-2 bg-orange-vivid-700 hover:bg-orange-vivid-800 duration-300 text-lg cursor-pointer text-orange-vivid-050'
          >
            Search city
          </button>
        </div>
      )}
    </div>
  );
}

export default WeatherCards;
