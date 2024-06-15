import WeatherForm from '../components/Weather/WeatherForm/WeatherForm';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import WeatherCards from '../components/Weather/WeatherCards/WeatherCards';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { weatherActions } from '../store/weather';

function WeatherPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem('weather');

    if (data) {
      dispatch(weatherActions.loadWeather(JSON.parse(data)));
    }
  }, [dispatch]);

  // .wrapper2 {
  //   max-width: 1200px;
  //   padding: 64px 0 86px;
  //   margin: auto;
  // }

  return (
    <section className='greyBg pb-16 pt-32 mt-0'>
      <div className='max-w-[1200px] mx-auto'>
        {/* <SectionHeader
          className='pageTitleCenter'
          subheader='Weather page'
          header='Look up the weather'
          type='medium'
        /> */}
        <WeatherForm />
        <WeatherCards />
      </div>
    </section>
  );
}

export default WeatherPage;
