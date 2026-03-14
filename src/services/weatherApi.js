import axios from 'axios';

const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Different weather data per city
const cityWeatherData = {
  'manila':      { temp: 32, feels_like: 36, humidity: 78, wind: 5.2, visibility: 8000,  condition: 'Clouds',       desc: 'partly cloudy',    temp_min: 27, temp_max: 34 },
  'davao city':  { temp: 29, feels_like: 32, humidity: 85, wind: 3.1, visibility: 10000, condition: 'Rain',         desc: 'light rain',       temp_min: 25, temp_max: 30 },
  'cebu':        { temp: 31, feels_like: 35, humidity: 80, wind: 4.5, visibility: 9000,  condition: 'Clear',        desc: 'clear sky',        temp_min: 26, temp_max: 33 },
  'quezon city': { temp: 33, feels_like: 37, humidity: 75, wind: 6.0, visibility: 7000,  condition: 'Clouds',       desc: 'scattered clouds', temp_min: 28, temp_max: 35 },
  'makati':      { temp: 33, feels_like: 38, humidity: 72, wind: 5.8, visibility: 7500,  condition: 'Clear',        desc: 'sunny',            temp_min: 28, temp_max: 35 },
  'boracay':     { temp: 28, feels_like: 30, humidity: 88, wind: 8.5, visibility: 12000, condition: 'Clouds',       desc: 'cloudy',           temp_min: 25, temp_max: 30 },
  'baguio':      { temp: 18, feels_like: 16, humidity: 92, wind: 9.2, visibility: 5000,  condition: 'Mist',         desc: 'misty',            temp_min: 14, temp_max: 20 },
  'palawan':     { temp: 27, feels_like: 29, humidity: 90, wind: 7.1, visibility: 15000, condition: 'Clear',        desc: 'clear sky',        temp_min: 24, temp_max: 29 },
  'zamboanga':   { temp: 30, feels_like: 34, humidity: 82, wind: 4.8, visibility: 9500,  condition: 'Rain',         desc: 'moderate rain',    temp_min: 26, temp_max: 32 },
  'iloilo':      { temp: 31, feels_like: 35, humidity: 79, wind: 5.5, visibility: 8500,  condition: 'Clouds',       desc: 'overcast clouds',  temp_min: 27, temp_max: 33 },
};

const forecastData = {
  'manila':      [
    { day: 'Mon', temp: 32, temp_min: 27, temp_max: 34, condition: 'Clouds',       desc: 'partly cloudy',    icon: '02d' },
    { day: 'Tue', temp: 30, temp_min: 26, temp_max: 32, condition: 'Rain',         desc: 'light rain',       icon: '10d' },
    { day: 'Wed', temp: 33, temp_min: 28, temp_max: 35, condition: 'Clear',        desc: 'sunny',            icon: '01d' },
    { day: 'Thu', temp: 31, temp_min: 27, temp_max: 33, condition: 'Clouds',       desc: 'scattered clouds', icon: '03d' },
    { day: 'Fri', temp: 29, temp_min: 25, temp_max: 31, condition: 'Thunderstorm', desc: 'thunderstorm',     icon: '11d' },
  ],
  'davao city':  [
    { day: 'Mon', temp: 29, temp_min: 25, temp_max: 31, condition: 'Rain',   desc: 'light rain',    icon: '10d' },
    { day: 'Tue', temp: 28, temp_min: 24, temp_max: 30, condition: 'Rain',   desc: 'moderate rain', icon: '10d' },
    { day: 'Wed', temp: 30, temp_min: 26, temp_max: 32, condition: 'Clouds', desc: 'cloudy',        icon: '03d' },
    { day: 'Thu', temp: 31, temp_min: 27, temp_max: 33, condition: 'Clear',  desc: 'clear sky',     icon: '01d' },
    { day: 'Fri', temp: 29, temp_min: 25, temp_max: 31, condition: 'Rain',   desc: 'light rain',    icon: '10d' },
  ],
  'baguio':      [
    { day: 'Mon', temp: 18, temp_min: 14, temp_max: 20, condition: 'Mist',   desc: 'misty',         icon: '50d' },
    { day: 'Tue', temp: 16, temp_min: 12, temp_max: 18, condition: 'Rain',   desc: 'light rain',    icon: '10d' },
    { day: 'Wed', temp: 19, temp_min: 15, temp_max: 21, condition: 'Clouds', desc: 'overcast',      icon: '04d' },
    { day: 'Thu', temp: 20, temp_min: 16, temp_max: 22, condition: 'Clear',  desc: 'clear sky',     icon: '01d' },
    { day: 'Fri', temp: 17, temp_min: 13, temp_max: 19, condition: 'Mist',   desc: 'foggy',         icon: '50d' },
  ],
};

const defaultForecast = [
  { day: 'Mon', temp: 31, temp_min: 26, temp_max: 33, condition: 'Clear',        desc: 'clear sky',        icon: '01d' },
  { day: 'Tue', temp: 29, temp_min: 25, temp_max: 31, condition: 'Clouds',       desc: 'scattered clouds', icon: '03d' },
  { day: 'Wed', temp: 28, temp_min: 24, temp_max: 30, condition: 'Rain',         desc: 'light rain',       icon: '10d' },
  { day: 'Thu', temp: 27, temp_min: 23, temp_max: 29, condition: 'Thunderstorm', desc: 'thunderstorm',     icon: '11d' },
  { day: 'Fri', temp: 30, temp_min: 26, temp_max: 32, condition: 'Clear',        desc: 'sunny',            icon: '01d' },
];

const buildWeatherResponse = (city, data) => ({
  name: city,
  sys: { country: 'PH' },
  main: {
    temp:       data.temp,
    feels_like: data.feels_like,
    humidity:   data.humidity,
    temp_min:   data.temp_min,
    temp_max:   data.temp_max,
  },
  weather:    [{ main: data.condition, description: data.desc, icon: '02d' }],
  wind:       { speed: data.wind },
  visibility: data.visibility,
});

const buildForecastResponse = (forecastList) => ({
  list: forecastList.map((f, i) => ({
    dt_txt: `2024-01-0${i + 1} 12:00:00`,
    main: { temp: f.temp, temp_min: f.temp_min, temp_max: f.temp_max },
    weather: [{ main: f.condition, description: f.desc, icon: f.icon }],
    wind: { speed: (Math.random() * 5 + 3).toFixed(1) },
  })),
});

const getDataForCity = (city) => {
  const key = city.toLowerCase().trim();
  return cityWeatherData[key] || {
    temp:       Math.floor(Math.random() * 8 + 26),
    feels_like: Math.floor(Math.random() * 8 + 28),
    humidity:   Math.floor(Math.random() * 20 + 70),
    wind:       (Math.random() * 5 + 3).toFixed(1),
    visibility: Math.floor(Math.random() * 5000 + 7000),
    condition:  'Clouds',
    desc:       'partly cloudy',
    temp_min:   Math.floor(Math.random() * 5 + 24),
    temp_max:   Math.floor(Math.random() * 5 + 31),
  };
};

const getForecastForCity = (city) => {
  const key = city.toLowerCase().trim();
  return forecastData[key] || defaultForecast;
};

// ── Exported functions ────────────────────────────────────────────────────────

export const getCurrentWeather = async (city = 'Manila') => {
  try {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });
    return res.data;
  } catch {
    return buildWeatherResponse(city, getDataForCity(city));
  }
};

export const getForecast = async (city = 'Manila') => {
  try {
    const res = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });
    return res.data;
  } catch {
    return buildForecastResponse(getForecastForCity(city));
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const [current, forecast] = await Promise.all([
      axios.get(`${BASE_URL}/weather`,  { params: { lat, lon, appid: API_KEY, units: 'metric' } }),
      axios.get(`${BASE_URL}/forecast`, { params: { lat, lon, appid: API_KEY, units: 'metric' } }),
    ]);
    return { current: current.data, forecast: forecast.data };
  } catch {
    return {
      current:  buildWeatherResponse('Current Location', getDataForCity('manila')),
      forecast: buildForecastResponse(defaultForecast),
    };
  }
};