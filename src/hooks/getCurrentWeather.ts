import { useState, useEffect } from "react";
import { GeoData, WeatherData } from "@/types";

export function useCurrentWeather(geoData: GeoData | null) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!geoData) return;

    const getCurrentWeather = async () => {
      setLoading(true);
      setError(null);
      const { lat, lon } = geoData;
      try {
        const res = await fetch(`/api/current/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch weather: ${res.statusText}`);
        }
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
          throw new Error("Unexpected weather data shape");
        }
      } catch (err: any) {
        console.error("Failed to fetch current weather:", err);
        setError(err.message || "Something went wrong");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentWeather();
  }, [geoData]);

  return { weatherData, loading, error };
}