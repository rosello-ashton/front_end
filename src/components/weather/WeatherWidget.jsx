import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast, getWeatherByCoords } from '../../services/weatherApi';
import ForecastDisplay from './ForecastDisplay';

const weatherIcons = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
  Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Haze: '🌫️',
};

export default function WeatherWidget() {
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locLoading, setLocLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const [curr, fore] = await Promise.all([
        getCurrentWeather(cityName),
        getForecast(cityName),
      ]);
      setWeather(curr);
      setForecast(fore);
    } catch (e) {
      setError(e.message || 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather('Davao City'); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleGeolocation = () => {
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { current, forecast: fore } = await getWeatherByCoords(coords.latitude, coords.longitude);
          setWeather(current);
          setForecast(fore);
        } catch (e) {
          setError('Could not get location weather');
        } finally {
          setLocLoading(false);
        }
      },
      () => { setError('Location access denied'); setLocLoading(false); }
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p>Fetching weather data...</p>
      </div>
    );
  }

  const mainWeather = weather?.weather?.[0]?.main || 'Clear';
  const icon = weatherIcons[mainWeather] || '🌤️';

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search city..."
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            🔍
          </button>
        </form>
        <button
          onClick={handleGeolocation}
          disabled={locLoading}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-sm transition-colors"
          title="Use my location"
        >
          {locLoading ? '⏳' : '📍'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {weather && (
        <>
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">📍 {weather.name}, {weather.sys?.country}</p>
                <p className="text-6xl font-bold mt-2">{Math.round(weather.main?.temp)}°C</p>
                <p className="text-blue-100 capitalize mt-1">{weather.weather?.[0]?.description}</p>
                <p className="text-blue-200 text-xs mt-1">Feels like {Math.round(weather.main?.feels_like)}°C</p>
              </div>
              <div className="text-7xl">{icon}</div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-blue-400">
              <div className="text-center">
                <p className="text-3xl">💧</p>
                <p className="font-bold text-lg">{weather.main?.humidity}%</p>
                <p className="text-blue-200 text-xs">Humidity</p>
              </div>
              <div className="text-center">
                <p className="text-3xl">💨</p>
                <p className="font-bold text-lg">{Math.round(weather.wind?.speed * 3.6)} km/h</p>
                <p className="text-blue-200 text-xs">Wind</p>
              </div>
              <div className="text-center">
                <p className="text-3xl">👁️</p>
                <p className="font-bold text-lg">{weather.visibility ? Math.round(weather.visibility / 1000) : '—'} km</p>
                <p className="text-blue-200 text-xs">Visibility</p>
              </div>
            </div>
          </div>
          {forecast && <ForecastDisplay forecastData={forecast} />}
        </>
      )}
    </div>
  );
}