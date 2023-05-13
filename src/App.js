import { useEffect } from 'react';

import Subtitle from './components/UI/Subtitle';
import Form from './components/Form';
import Cards from './components/Cards';

import { useDispatch } from 'react-redux';
import { dataActions } from './store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

    if (cardsFromLocalStorage === null) return;

    dispatch(dataActions.setCards(cardsFromLocalStorage));
  }, [dispatch]);

  return (
    <div>
      <Subtitle />
      <Form />
      <Cards />
    </div>
  );
}

export default App;
