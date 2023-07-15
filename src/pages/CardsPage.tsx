import Cards from '../components/CardsFolder/Cards/Cards';

import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import LoginToGetAccess from '../components/common/LoginToGetAccess/LoginToGetAccess';
import { auth } from '../config/firebase';

function CardsPage() {
  const user = auth.currentUser;

  return (
    <section className='greyBg paddingBottom'>
      {!user && <LoginToGetAccess />}
      {user && (
        <SectionHeader
          className='pageTitleCenter paddingTop'
          subheader='Cards page'
          header='Start planning your days'
          type='medium'
        />
      )}
      {user && <Cards />}
    </section>
  );
}

export default CardsPage;
