const weatherIcons = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
  Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Haze: '🌫️',
};

export default function ForecastDisplay({ forecastData }) {
  if (!forecastData?.list) return null;

  const dailyMap = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const hour = date.getHours();
    if (!dailyMap[day] || Math.abs(hour - 12) < Math.abs(new Date(dailyMap[day].dt * 1000).getHours() - 12)) {
      dailyMap[day] = item;
    }
  });

  const days = Object.entries(dailyMap).slice(0, 5);

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-600 mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {days.map(([day, item]) => {
          const main = item.weather?.[0]?.main || 'Clear';
          const icon = weatherIcons[main] || '🌤️';
          return (
            <div key={day} className="bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 text-center">
              <p className="text-xs font-semibold text-slate-500">{day.split(',')[0]}</p>
              <p className="text-2xl my-1">{icon}</p>
              <p className="font-bold text-slate-800 text-sm">{Math.round(item.main?.temp)}°</p>
              <p className="text-xs text-slate-400">{Math.round(item.main?.temp_min)}° / {Math.round(item.main?.temp_max)}°</p>
              <p className="text-xs text-blue-500 mt-1 capitalize">{item.weather?.[0]?.description?.split(' ')[0]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}