import { useState, useEffect } from "react";
import { GeoData, WeekForecastItem } from "@/types";

export function useWeekWeather(geoData: GeoData | null) {
  const [weekWeatherData, setWeekWeatherData] = useState<WeekForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!geoData) return;

    const getWeekWeather = async () => {
      setLoading(true);
      setError(null);
      const { lat, lon } = geoData;
      try {
        const res = await fetch(`/api/week?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch week weather: ${res.statusText}`);
        }
        const data = await res.json();
        if (data && data.list) {
          const filteredList = data.list.filter((item: any) =>
            item.dt_txt.includes("12:00:00")
          );
          setWeekWeatherData(filteredList);
        } else {
          throw new Error("Unexpected week weather data shape");
        }
      } catch (err: any) {
        console.error("Failed to fetch week weather:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getWeekWeather();
  }, [geoData]);

  return { weekWeatherData, loading, error };
}
