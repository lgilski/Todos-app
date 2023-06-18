/**
 * @returns {Promise<WeatherData>}
 */
export async function fetchWeather({ city }) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=no`
  );

  const data = await response.json();

  if (data?.error) {
    return data.error;
  }

  return data;
}
