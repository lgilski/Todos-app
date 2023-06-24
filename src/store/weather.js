import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: null,
  showOnCards: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    createWeatherCard(state, action) {
      state.data.push(action.payload);

      localStorage.setItem('weather', JSON.stringify(state.data));
    },

    loadWeather(state, action) {
      state.data = action.payload;
    },

    deleteWeather(state, action) {
      state.data = state.data.filter(weather => weather !== action.payload);

      localStorage.setItem('weather', JSON.stringify(state.data));
    },

    setError(state, action) {
      state.error = action.payload;
    },

    showOnCards(state, action) {
      state.showOnCards = action.payload;

      localStorage.setItem('favorite', JSON.stringify(state.showOnCards));
    },

    stopShowingOnCards(state, action) {
      state.showOnCards = null;

      localStorage.setItem('favorite', JSON.stringify(state.showOnCards));
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
