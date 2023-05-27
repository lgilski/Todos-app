import { useRouteLoaderData } from 'react-router-dom';
import classes from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { dataActions } from '../store';

function HomePage() {
  const dispatch = useDispatch();

  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

  useEffect(() => {
    if (cardsFromLocalStorage !== null) {
      dispatch(dataActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(dataActions.setCards([]));
    }
  }, []);
  const { email } = useRouteLoaderData('root');

  return (
    <>
      {email && <p>Welcome {email}</p>}
      <section className={classes.wrapper}>
        <div className={classes.hero}>
          <h2 className={classes['hero-text']}>
            Here you can keep all your todos and more!
          </h2>
        </div>
      </section>
      <section className={classes.wrapper}>
        <h3 className={classes.subheader}>We have many UwU features</h3>
        <div className={classes.features}>
          <div className={classes['features-element']}>
            <ion-icon name='albums-sharp'></ion-icon>
            <p>
              Cool and awesome cards as todos which contains your tasks for
              certain days!
            </p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='partly-sunny-sharp'></ion-icon>
            <p>You can always look up at the weather in certain places</p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='cloud-done-sharp'></ion-icon>
            <p>All your cards are saved on your account</p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='timer-sharp'></ion-icon>
            <p>You can set multiple OwO timers in sequence</p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='search-sharp'></ion-icon>
            <p>You can also search for certain task in all your todos</p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='thunderstorm-sharp'></ion-icon>
            <p>
              Weather is shown on cards in case something might change because
              of it
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className='developement'>STILL IN DEVELOPEMENT</div>
      </section>
      {/* <section className={classes.wrapper}>
        <h3 className={classes.subheader}>How does it work?</h3>
      </section> */}
    </>
  );
}

export default HomePage;
