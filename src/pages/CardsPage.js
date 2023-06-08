import FormCards from '../components/CardsFolder/FormCard';
import Cards from '../components/CardsFolder/Cards';
import { Link, useRouteLoaderData } from 'react-router-dom';

import classes from './CardsPage.module.css';

function CardsPage() {
  const { token } = useRouteLoaderData('root');

  return (
    <>
      {!token && (
        <section className={classes.wrapper}>
          <div className={classes.loginToGetAccess}>
            Log in to get access to your cards.
          </div>
          <div className={classes.textContainer}>
            <h2 className={classes['cards--h2']}>Don't have an account?</h2>
            <Link to='/auth?mode=signup' className={classes.signup}>
              Sing up now
            </Link>
          </div>
        </section>
      )}
      {token && (
        <div className='pageTitle-center'>
          <h5 className='subheader'>Cards page</h5>
          <h4 className='header'>Make your to-dos</h4>
        </div>
      )}
      {token && <FormCards />}
      {token && <Cards />}
    </>
  );
}

export default CardsPage;
