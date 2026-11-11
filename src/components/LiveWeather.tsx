import { useEffect, useState } from 'react';
import { AlertTriangle, CloudDrizzle, CloudRain, CloudSun, Droplets, RefreshCw, Sun, Wind } from 'lucide-react';

type ForecastDay = {
  time: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_probability_max: number;
};
type WeatherPayload = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: ForecastDay[];
};

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-0.046&longitude=37.65&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Africa%2FNairobi&forecast_days=4';

function describeWeather(code: number) {
  if (code === 0) return 'Clear sky';
  if ([1, 2].includes(code)) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain showers';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Current conditions';
}

function WeatherGlyph({ code, size = 22 }: { code: number; size?: number }) {
  if ([0].includes(code)) return <Sun size={size} />;
  if ([1, 2, 3, 45, 48].includes(code)) return <CloudSun size={size} />;
  if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle size={size} />;
  if ([95, 96, 99].includes(code)) return <CloudRain size={size} />;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain size={size} />;
  return <CloudSun size={size} />;
}

function formatDay(date: string, index: number) {
  if (index === 0) return 'TODAY';
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'Africa/Nairobi' })
    .format(new Date(date + 'T12:00:00+03:00')).toUpperCase();
}

export default function LiveWeather({ irrigation, onToggleIrrigation }: {
  irrigation: boolean;
  onToggleIrrigation: () => void;
}) {
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const loadWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(WEATHER_URL);
      if (!response.ok) throw new Error('Weather service returned an error.');
      const data = await response.json() as WeatherPayload;
      if (!data.current || !Array.isArray(data.daily)) throw new Error('Weather response was incomplete.');
      setWeather(data);
      setUpdatedAt(new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setError('Live weather could not be loaded. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadWeather(); }, []);

  return <section className="panel weather-panel">
    <div className="panel-head">
      <div><div className="eyebrow">FIELD CONDITIONS · MERU COUNTY</div><h3>Weather & irrigation</h3></div>
      <span className="soft-tag live-weather-tag"><span className="pulse-dot" /> LIVE WEATHER</span>
    </div>
    {loading && !weather ? <div className="weather-loading">Loading current weather for Meru…</div> : error && !weather ? <div className="weather-error"><AlertTriangle size={18}/><span>{error}</span><button className="text-action" onClick={()=>void loadWeather()}>Retry <RefreshCw size={14}/></button></div> : weather && <>
      <div className="weather-main">
        <div className="weather-icon"><WeatherGlyph code={weather.current.weather_code} size={44}/></div>
        <div><div className="temperature mono">{Math.round(weather.current.temperature_2m)}°<small>C</small></div><b>{describeWeather(weather.current.weather_code)}</b><span>Meru, Kenya · Feels like {Math.round(weather.current.apparent_temperature)}°C</span></div>
        <div className="weather-extra">
          <div><Droplets size={17}/><b>{Math.round(weather.current.relative_humidity_2m)}%</b><small>Humidity</small></div>
          <div><Wind size={17}/><b>{Math.round(weather.current.wind_speed_10m)}</b><small>Wind km/h</small></div>
        </div>
      </div>
      <div className="forecast">{weather.daily.map((day,index)=><div key={day.time}>
        <small>{formatDay(day.time,index)}</small><WeatherGlyph code={day.weather_code}/>
        <b>{Math.round(day.temperature_2m_max)}° / {Math.round(day.temperature_2m_min)}°</b>
        <span>{Math.round(day.precipitation_probability_max)}% rain</span>
      </div>)}</div>
      <div className="weather-meta"><span>Updated {updatedAt || 'just now'} · {weather.current.precipitation} mm current precipitation</span><button className="text-action" onClick={()=>void loadWeather()} disabled={loading}><RefreshCw size={13}/> Refresh</button></div>
    </>}
    <div className="irrigation-row"><div className="irrigation-icon"><Droplets size={19}/></div><div className="irrigation-copy"><b>Irrigation reminder</b><small>{irrigation?'Reminder enabled · Review soil before watering':'Reminder paused · Manual checks only'}</small></div><button className={irrigation?'toggle on':'toggle'} onClick={onToggleIrrigation} aria-label="Toggle irrigation reminder"><span/></button></div>
    <div className="weather-attribution">Forecast by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · Model data, not an on-farm sensor reading</div>
  </section>;
}
