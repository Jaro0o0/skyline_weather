import { WeatherData, WeekForecastItem } from "./weather.types";

// Props for the ShareCol sidebar component
export interface ShareColProps {
  cityInput: string;
  setCityInput: (value: string) => void;
  handleChange: () => void;
  loading: boolean;
  activeCity: string;
  handlePresetSelect: (city: string) => void;
  weatherData: WeatherData | null;
  view: 'Today' | 'Week';
  setView: (view: 'Today' | 'Week') => void;
  weekWeatherData: WeekForecastItem[];
}

// Props for the WeatherIcon component
export interface WeatherIconProps {
  iconCode?: string;
  className?: string;
}
