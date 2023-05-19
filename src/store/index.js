import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * @type {DataState}
 */
const initialState = {
  cards: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    /**
     * @param {DataState} state
     * @param {{ payload: Card[] }} action
     */
    setCards(state, action) {
      state.cards = action.payload;
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: Card }} action
     */
    createCard(state, action) {
      // console.log('createCard', action);
      state.cards.push(action.payload);

      state.cards.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      fetch(
        'https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/' +
          localStorage.getItem('email').split('.').join('-') +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { id: string } }} action
     */
    deleteCard(state, action) {
      state.cards = state.cards.filter(card => card.id !== action.payload.id);

      fetch(
        'https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/' +
          localStorage.getItem('email').split('.').join('-') +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));

      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { cardId: string, task: Task } }} action
     */
    createTask(state, action) {
      // console.log('createTask', action);

      state.cards.forEach(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = [action.payload.task, ...card.tasks];

        // return { ...card, tasks: [...card.tasks, action.payload.task] };
      });

      fetch(
        'https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/' +
          localStorage.getItem('email').split('.').join('-') +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { cardId: string, taskId: string } }} action
     */
    deleteTask(state, action) {
      state.cards = state.cards.map(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = card.tasks.filter(
          task => task.id !== action.payload.taskId
        );
        return card;
      });

      fetch(
        'https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/' +
          localStorage.getItem('email').split('.').join('-') +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },
  },
});

const store = configureStore({
  reducer: { data: dataSlice.reducer },
});

export const dataActions = dataSlice.actions;

export default store;
