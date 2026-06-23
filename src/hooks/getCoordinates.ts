import { useState, useCallback } from "react";
import { GeoData, UseCoordinatesOptions } from "@/types";


export function useCoordinates({
  initialCity = "Warsaw",
  initialGeoData = { lat: 52.2297, lon: 21.0122 },
}: UseCoordinatesOptions = {}) {
  const [geoData, setGeoData] = useState<GeoData>(initialGeoData);
  const [activeCity, setActiveCity] = useState<string>(initialCity);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = useCallback(async (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/latitude/${trimmed}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch coordinates");
      }
      const data = await res.json();
      setGeoData(data);
      
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      setActiveCity(capitalized);
      
    } catch (err: any) {
      console.error("Failed to fetch geolocation:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    geoData,
    activeCity,
    loading,
    error,
    fetchCoordinates,
  };
}
