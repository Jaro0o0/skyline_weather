// Current weather data from the API
export interface WeatherData {
  temp: number;
  location: string;
  description: string;
  icon: string;
  wind?: {
    speed: number;
  };
  humidity?: number;
  pressure?: number;
}

// A single forecast item in the 5-day/week forecast list
export interface WeekForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}
