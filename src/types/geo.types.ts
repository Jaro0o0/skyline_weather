// Geographic coordinates
export interface GeoData {
  lat: number;
  lon: number;
}

// Options for the useCoordinates hook
export interface UseCoordinatesOptions {
  initialCity?: string;
  initialGeoData?: GeoData;
}
