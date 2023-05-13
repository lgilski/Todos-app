import Card from './Card';
import classes from './Cards.module.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import cardClasses from './Card.module.css';

import { useSelector } from 'react-redux';

const Cards = function () {
  const cards = useSelector(state => state.cards);

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

export default Cards;
