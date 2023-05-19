import Card from './Card';
import classes from './Cards.module.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import cardClasses from './Card.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { dataActions } from '../store';

const Cards = function () {
  const dispatch = useDispatch();

  const cards = useSelector(state => state.data.cards);
  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

  // const data = useLoaderData();
  // console.log(data);

  useEffect(() => {
    if (cardsFromLocalStorage !== null) {
      dispatch(dataActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(dataActions.setCards([]));
    }
  }, []);

  console.log(cards);

  const hasCards = cards.length > 0;

  return (
    <div className={classes.plansContainer}>
      <TransitionGroup>
        {!hasCards && (
          <CSSTransition
            classNames={{
              enterActive: classes['message-enter-active'],
              enter: classes['message-enter'],
              exitActive: classes['message-exit-active'],
              exit: classes['message-exit'],
            }}
            timeout={300}
          >
            <h4 className={classes.message}>There are no plans yet</h4>
          </CSSTransition>
        )}
      </TransitionGroup>
      <TransitionGroup component='div' className={classes.plans}>
        {cards.map(card => (
          <CSSTransition
            key={card.id}
            classNames={{
              enterActive: cardClasses['fade-enter-active'],
              enter: cardClasses['fade-enter'],
              exitActive: cardClasses['fade-exit-active'],
              exit: cardClasses['fade-exit'],
            }}
            timeout={300}
          >
            <Card key={card.id} card={card} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export const loader = function () {
  const cards = localStorage.getItem('cards');
  return cards;
};

export default Cards;
