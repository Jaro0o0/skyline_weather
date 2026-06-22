"use client"

import { useState, useEffect, useCallback } from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import WeatherIcon from "@/components/WeatherIcon";

interface GeoData {
  lat: number;
  lon: number;
}

const PRESET_CITIES = ["Warsaw", "London", "New York", "Tokyo", "Paris"];

export default function Page() {
  const [geoData, setGeoData] = useState<GeoData>({ lat: 52.2297, lon: 21.0122 });
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weekWeatherData, setWeekWeatherData] = useState<any[]>([]);
  const [view, setView] = useState<'Week' | 'Today'>('Today');
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCity, setActiveCity] = useState('Warsaw');

  const fetchCoordinates = useCallback(async (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/latitude/${trimmed}`);
      if (!res.ok) {
        const errData = await res.json();
        console.error('Geolocation API error:', errData);
        return;
      }
      const data = await res.json();
      setGeoData(data);
      // Format city name nicely
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      setActiveCity(capitalized);
    } catch (err) {
      console.error('Failed to fetch geolocation:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(() => {
    fetchCoordinates(cityInput);
  }, [cityInput, fetchCoordinates]);

  const handlePresetSelect = (city: string) => {
    setCityInput(city);
    fetchCoordinates(city);
  };

  // WEATHER_DATA
  useEffect(() => {
    if (!geoData) return;
    const getCurrentWeather = async () => {
      const { lat, lon } = geoData;
      try {
        const res = await fetch(`/api/current/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data && data.main && data.weather && data.weather[0]) {
          setWeatherData({
            temp: data.main.temp,
            location: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind: data.wind,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
          });
        } else {
          console.error('Unexpected weather data shape:', data);
          setWeatherData(null);
        }
      } catch (err) {
        console.error('Failed to fetch current weather:', err);
        setWeatherData(null);
      }
    };
    getCurrentWeather();
  }, [geoData]);

  // WEEK
  useEffect(() => {
    const getWeekWeather = async () => {
      const { lat, lon } = geoData;
      try {
        const res = await fetch(`/api/week?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        const filteredList = data.list.filter((item: any) => item.dt_txt.includes("12:00:00"));
        setWeekWeatherData(filteredList);
      } catch (err) {
        console.error('Failed to fetch week weather:', err);
      }
    };
    getWeekWeather();
  }, [geoData]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row h-screen overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* SEARCH_COL - Sidebar */}
      <aside className="w-full lg:w-96 flex-shrink-0 bg-slate-900/40 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col h-full overflow-hidden z-10">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="w-5 h-5 text-white animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Skyline Weather
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChange()}
              placeholder="Search city..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
              disabled={loading}
            />
            <div className="absolute left-3.5 text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleChange}
              disabled={loading}
              className="absolute right-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center min-w-[32px] h-7"
            >
              {loading ? (
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : 'Go'}
            </button>
          </div>

          {/* Quick Preset Cities */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {PRESET_CITIES.map((city) => {
              const isActive = activeCity.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  onClick={() => handlePresetSelect(city)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-blue-500/20 border border-blue-500/40 text-blue-300 shadow-sm shadow-blue-500/10"
                      : "bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Scrollable Panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Weather Mini Card */}
          <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Current Forecast</p>
                <h2 className="text-white text-lg font-bold mt-1 truncate max-w-[150px]">{weatherData?.location || activeCity}</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px] font-medium border border-white/5 uppercase">
                Live
              </span>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <WeatherIcon iconCode={weatherData?.icon} className="w-14 h-14" />
              <div>
                <p className="text-4xl font-extrabold tracking-tight text-white">{Math.round(weatherData?.temp || 0)}°C</p>
                <p className="text-slate-400 text-xs capitalize mt-0.5">{weatherData?.description || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* View Switcher Toggle */}
          <div className="flex bg-slate-950/60 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setView('Today')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                view === 'Today' ? 'bg-white/10 text-white border border-white/5' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setView('Week')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                view === 'Week' ? 'bg-white/10 text-white border border-white/5' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              5-Day Forecast
            </button>
          </div>

          {/* WEEK FORECAST IN SIDEBAR */}
          {view === 'Week' && (
            <div className="space-y-2.5">
              {weekWeatherData?.map((item, index) => (
                <div key={index} className="glass-card rounded-xl p-3 flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold truncate">
                      {new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                    <p className="text-slate-500 text-[10px] mt-0.5 font-medium">
                      {new Date(item.dt_txt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>

                  <WeatherIcon iconCode={item.weather?.[0]?.icon} className="w-8 h-8 flex-shrink-0" />

                  <div className="text-right flex-shrink-0">
                    <p className="text-white text-xs font-extrabold">{Math.round(item.main?.temp || 0)}°C</p>
                    <p className="text-slate-400 text-[10px] capitalize truncate max-w-[80px]">
                      {item.weather?.[0]?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Metrics List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Atmosphere</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="glass-card rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-400">Humidity</span>
                </div>
                <span className="text-xs font-bold text-white">{weatherData?.humidity ?? '--'}%</span>
              </div>

              <div className="glass-card rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg className="w-4 h-4 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-400">Wind Speed</span>
                </div>
                <span className="text-xs font-bold text-white">{weatherData?.wind?.speed ?? '--'} m/s</span>
              </div>

              <div className="glass-card rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-400">Pressure</span>
                </div>
                <span className="text-xs font-bold text-white">{weatherData?.pressure ?? '--'} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Dashboard_COL - Main content */}
      <section className="flex-1 h-full overflow-y-auto p-4 lg:p-8 z-10 flex flex-col">
        <Dashboard weatherData={weatherData} weekWeatherData={weekWeatherData} />
      </section>
    </main>
  );
}