import { useEffect } from 'react';
import Hero from '../components/Home/Hero/Hero';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import Features from '../components/Home/Features/Features';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import CardsPreview from '@/components/Home/CardsPreview/CardsPreview';
import TimersPreview from '@/components/Home/TimersPreview/TimersPreview';

function HomePage() {
  const navigate = useNavigate();

  const userVerified = auth.currentUser?.emailVerified;

  useEffect(() => {
    if (userVerified) {
      navigate('/app/cards');
    }
  }, [userVerified, navigate]);

  return (
    <>
      <Hero />
      <CardsPreview />
      <TimersPreview />
    </>
  );
}

export default HomePage;
