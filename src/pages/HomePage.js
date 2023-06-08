import { Link, useRouteLoaderData } from 'react-router-dom';
import classes from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { dataActions } from '../store';
import Button from '../components/UI/Button';

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
      {/* {email && <p>Welcome {email}</p>} */}
      <section>
        <div className={classes.hero}>
          <div className={classes['hero-text']}>
            <h2 className={classes['hero-text-heading']}>
              Here you can keep all your todos and more!
            </h2>
            <p className={classes['hero-text-p']}>
              We offer a really cool way of planing your to-dos. You will surely
              have a lot of fun.
            </p>
            {/* <Button btnType='capsule' btnColor='orange'>
              Get started
            </Button> */}
            <Link to='/auth?mode=signup' className={classes.mainButton}>
              Get started
            </Link>
          </div>
        </div>
      </section>
      <section className={classes.wrapper}>
        <div>
          <h4 className='subheader'>features</h4>
          <h3 className='header'>We have many UwU features</h3>
        </div>
        <div className={classes.features}>
          <div className={classes['features-element']}>
            <ion-icon name='albums' />
            <h5 className={classes['features-element-header']}>Todos</h5>
            <p className={classes['features-element-text']}>
              Cool and awesome cards as todos which contains your tasks for
              certain days!
            </p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='partly-sunny'></ion-icon>
            <h5 className={classes['features-element-header']}>Weather</h5>
            <p className={classes['features-element-text']}>
              You can always look up at the weather in certain places
            </p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='cloud-done' />
            <h5 className={classes['features-element-header']}>Saving</h5>
            <p className={classes['features-element-text']}>
              All your cards are saved on your account
            </p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='timer'></ion-icon>
            <h5 className={classes['features-element-header']}>Timers</h5>
            <p className={classes['features-element-text']}>
              You can set multiple OwO timers in sequence
            </p>
          </div>
          {/* <div className={classes['features-element']}>
            <ion-icon name='search-sharp'></ion-icon>
            <h5 className={classes['features-element-header']}>Search task</h5>
            <p className={classes['features-element-text']}>
              You can also search for certain task in all your todos
            </p>
          </div>
          <div className={classes['features-element']}>
            <ion-icon name='thunderstorm-sharp'></ion-icon>
            <h5 className={classes['features-element-header']}>
              Addition for cards
            </h5>
            <p className={classes['features-element-text']}>
              Weather is shown on cards in case something might change because
              of it
            </p>
          </div> */}
        </div>
      </section>
      {/* <section className='dark-section'>
        <div className={classes.wrapperSecond}>
          <h4 className='subheader'>What we offer</h4>
          <h3
            style={{ color: '#fff' }}
            className={`header ${classes['light-header']}`}
          >
            How does it work?
          </h3>
          <div style={{ color: '#fff' }}>AAAAAAAAAAAA</div>
        </div>
      </section> */}
      <section>
        <div className='developement'>STILL IN DEVELOPEMENT</div>
      </section>
    </>
  );
}

export default HomePage;
