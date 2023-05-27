import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimers(state, action) {
      state.timers = action.payload;

      return state;
    },
    createTimer(state, action) {
      state.timers.push(action.payload);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },
    deleteTimer(state, action) {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
