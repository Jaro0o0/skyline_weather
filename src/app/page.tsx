"use client"

import { useState,  useCallback } from "react";
import Dashboard from "@/components/Dashboard/Dashboard";

import ShareCol from "@/components/ShareCol/ShareCol";

// Custom HOOKS IMPORT
import { useCurrentWeather } from "@/hooks/getCurrentWeather";
import { useWeekWeather } from "@/hooks/getWeekWeather";
import { useCoordinates } from "@/hooks/getCoordinates";



export default function Page() {

  const { geoData, activeCity, loading, fetchCoordinates } = useCoordinates();
  
  // Fetching_DATA
  const { weatherData } = useCurrentWeather(geoData);
  const { weekWeatherData } = useWeekWeather(geoData);

  const [view, setView] = useState<'Week' | 'Today'>('Today');
  const [cityInput, setCityInput] = useState('');

  const handleChange = useCallback(() => {
    fetchCoordinates(cityInput);
  }, [cityInput, fetchCoordinates]);

  const handlePresetSelect = (city: string) => {
    setCityInput(city);
    fetchCoordinates(city);
  };




  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row h-screen overflow-hidden relative">
   
      {/* SHARE_COL */}
      <ShareCol
        cityInput={cityInput}
        setCityInput={setCityInput}
        handleChange={handleChange}
        loading={loading}
        activeCity={activeCity}
        handlePresetSelect={handlePresetSelect}
        weatherData={weatherData}
        view={view}
        setView={setView}
        weekWeatherData={weekWeatherData}
      />


      {/* Dashboard_COL - Main content */}
      <section className="flex-1 h-full overflow-y-auto p-4 lg:p-8 z-10 flex flex-col">
        <Dashboard weatherData={weatherData} weekWeatherData={weekWeatherData} />
      </section>
      
    </main>
  );
}