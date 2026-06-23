import { WeatherIconProps } from "@/types";

export default function WeatherIcon({ iconCode = "01d", className = "w-16 h-16" }: WeatherIconProps) {
  const code = iconCode.replace(/[dn]/, ""); // Strip day/night indicator for general type

  // Sun / Clear Sky
  if (code === "01") {
    return (
      <svg
        className={`${className} animate-float text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Few clouds / Scattered clouds
  if (code === "02" || code === "03") {
    return (
      <svg
        className={`${className} animate-float text-blue-300 filter drop-shadow-[0_0_8px_rgba(147,197,253,0.3)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* Sun peeking out */}
        <circle cx="15.5" cy="8.5" r="3" className="text-amber-400" />
        <path d="M6.5 18a4.5 4.5 0 0 1-.5-8.973c.319-2.28 2.278-4.027 4.652-4.027a4.652 4.652 0 0 1 4.536 3.593A5.5 5.5 0 0 1 15 18H6.5z" />
      </svg>
    );
  }

  // Broken clouds / Overcast
  if (code === "04") {
    return (
      <svg
        className={`${className} animate-float text-slate-400 filter drop-shadow-[0_0_6px_rgba(148,163,184,0.3)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.364 9.364a5.5 5.5 0 0 0-9.444-1.12 4.5 4.5 0 0 0-8.42 2.256A4.5 4.5 0 0 0 6 18h13a5 5 0 0 0 .364-9.636z" />
      </svg>
    );
  }

  // Shower rain / Rain
  if (code === "09" || code === "10") {
    return (
      <svg
        className={`${className} animate-float text-blue-400 filter drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" fill="currentColor" className="text-slate-400" stroke="none" />
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" />
        <line x1="8" y1="19" x2="8" y2="21" className="text-blue-300 animate-pulse" />
        <line x1="12" y1="19" x2="12" y2="21" className="text-blue-300 animate-pulse" />
        <line x1="16" y1="19" x2="16" y2="21" className="text-blue-300 animate-pulse" />
      </svg>
    );
  }

  // Thunderstorm
  if (code === "11") {
    return (
      <svg
        className={`${className} animate-float text-yellow-400 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" fill="currentColor" className="text-slate-500" stroke="none" />
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" />
        <path d="M13 18l-2 3h3l-2 3" stroke="currentColor" fill="currentColor" />
      </svg>
    );
  }

  // Snow
  if (code === "13") {
    return (
      <svg
        className={`${className} animate-float text-sky-200 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.4)]`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" fill="currentColor" className="text-slate-300" stroke="none" />
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25" />
        <circle cx="8" cy="18" r="1" fill="currentColor" />
        <circle cx="12" cy="19" r="1" fill="currentColor" />
        <circle cx="16" cy="18" r="1" fill="currentColor" />
      </svg>
    );
  }

  // Mist / Fog (50)
  return (
    <svg
      className={`${className} text-teal-300 filter drop-shadow-[0_0_6px_rgba(110,231,183,0.3)]`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
}
