import Cards from '../components/CardsFolder/Cards/Cards';

import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import LoginToGetAccess from '../components/common/LoginToGetAccess/LoginToGetAccess';
import { auth } from '../config/firebase';

function CardsPage() {
  const userVerified = auth.currentUser?.emailVerified;

  return (
    <section className='greyBg pb-16 pt-32 mt-0'>
      {!userVerified && <LoginToGetAccess />}
      {userVerified && <Cards />}
    </section>
  );
}

export default CardsPage;
