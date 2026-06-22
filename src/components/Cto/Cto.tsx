import { useState, useEffect } from "react";
import WeatherIcon from "../WeatherIcon";

function Cto({ weatherData }: { weatherData: any; weekWeatherData: any[] }) {
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      setDateStr(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherTip = (iconCode?: string) => {
    if (!iconCode) return "Loading atmospheric suggestions...";
    const code = iconCode.replace(/[dn]/, "");
    switch (code) {
      case "01":
        return "Skies are completely clear. It's a wonderful day for a walk or outdoor activities!";
      case "02":
      case "03":
        return "A few scattered clouds. Great temperature balance, ideal for getting fresh air.";
      case "04":
        return "Overcast skies today. Keep it cozy and enjoy some indoor comfort.";
      case "09":
      case "10":
        return "Precipitation expected. Make sure to keep your umbrella handy and stay dry!";
      case "11":
        return "Thunderstorm warnings in effect. Best to remain indoors and avoid open spaces.";
      case "13":
        return "Snow falling. Perfect winter scenery, bundle up warm before heading out!";
      default:
        return "Atmospheric conditions are changing. Have a wonderful day!";
    }
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden relative h-72 lg:h-80 shadow-2xl border border-white/10 group bg-slate-900/50">
      {/* Dark gradient overlay on top of video */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/20 z-10"></div>
      
      {/* TEXT_BOX Content Overlay */}
      <div className="absolute flex flex-col justify-between inset-0 p-6 lg:p-8 z-20">
        
        {/* Top Header Row (Location + Live Clock) */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5 shadow-inner">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-white text-xs font-semibold tracking-wide">
              {weatherData?.location || "Loading Location..."}
            </p>
          </div>

          <div className="text-right">
            <p className="text-white text-xl font-black tracking-widest bg-white/5 backdrop-blur-sm px-3.5 py-1 rounded-xl border border-white/5 inline-block tabular-nums">
              {time || "--:--"}
            </p>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-1.5">
              {dateStr || "Updating Date..."}
            </p>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="flex justify-between items-end gap-6">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">TODAY'S ATMOSPHERE</span>
            <p className="text-white text-2xl lg:text-3xl font-extrabold capitalize mt-1 tracking-tight truncate">
              {weatherData?.description || "No weather description available"}
            </p>
            <p className="text-slate-300 text-xs mt-2 max-w-md hidden md:block leading-relaxed bg-black/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/5">
              {getWeatherTip(weatherData?.icon)}
            </p>
          </div>
          
          <div className="flex-shrink-0 flex items-center justify-center p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
            <WeatherIcon iconCode={weatherData?.icon} className="w-16 h-16 lg:w-20 lg:h-20" />
          </div>
        </div>

      </div>

      <video 
        src="/videos/cloud.mp4" 
        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[8s] ease-out pointer-events-none" 
        autoPlay 
        loop 
        muted 
        playsInline
      />
    </div>
  );
}

export default Cto;