import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: [],
  countDownMethod: 'Manually',
  startAllTimers: false,
  resetAllTimers: false,
  activeIndex: -1,
  startSequence: false,
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

    editTimer(state, action) {
      state.timers.forEach(timer => {
        if (timer.id !== action.payload.timerId) return timer;

        timer.hours = action.payload.hours;
        timer.minutes = action.payload.minutes;
        timer.seconds = action.payload.seconds;
        timer.timerName = action.payload.timerName;

        localStorage.setItem('timers', JSON.stringify(state.timers));
      });
    },

    deleteTimer(state, action) {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },

    /////////////////////////////////////////

    // Implement counting down timers in sequence, one after another

    setTimerCountDownMethod(state, action) {
      state.countDownMethod = action.payload;
    },

    startTimers(state, action) {
      state.startAllTimers = action.payload;
    },

    resetTimers(state, action) {
      state.resetAllTimers = action.payload;
      state.activeIndex = -1;
    },

    startTimersInSquence(state, action) {
      state.startSequence = true;
      if (state.activeIndex === -1) {
        state.activeIndex = 0;
      }
    },

    stopTimersInSquence(state, action) {
      state.startSequence = false;
    },

    incrementActiveIndexInSequence(state, action) {
      state.activeIndex += 1;
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
