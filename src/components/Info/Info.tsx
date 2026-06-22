



import React from "react";

function Info({ weatherData }: { weatherData: any }) {
  // Safety checks & fallback values
  const tempVal = weatherData?.temp != null ? Math.round(weatherData.temp) : null;
  const windVal = weatherData?.wind?.speed != null ? weatherData.wind.speed : null;
  const humidityVal = weatherData?.humidity != null ? weatherData.humidity : null;
  const pressureVal = weatherData?.pressure != null ? weatherData.pressure : null;

  // Status descriptors
  const getTempDesc = (t: number | null) => {
    if (t == null) return "No data";
    if (t < 5) return "Very Cold / Freezing";
    if (t < 15) return "Chilly / Cool air";
    if (t < 25) return "Pleasant / Mild";
    if (t < 35) return "Warm / Hot day";
    return "Extreme Heat Warning";
  };

  const getWindDesc = (w: number | null) => {
    if (w == null) return "No data";
    if (w < 2) return "Calm / Still air";
    if (w < 5) return "Light / Gentle breeze";
    if (w < 10) return "Moderate breeze";
    if (w < 15) return "Strong winds";
    return "Gale force warning";
  };

  const getHumidityDesc = (h: number | null) => {
    if (h == null) return "No data";
    if (h < 30) return "Dry air / Comfortable";
    if (h < 60) return "Optimal humidity";
    if (h < 80) return "Humid / Damp air";
    return "High humidity alert";
  };

  const getPressureDesc = (p: number | null) => {
    if (p == null) return "No data";
    if (p < 1000) return "Low pressure system";
    if (p < 1013) return "Normal low pressure";
    if (p < 1025) return "Stable high pressure";
    return "Very high pressure";
  };

  const infoItems = [
    {
      name: "Temperature",
      value: tempVal !== null ? `${tempVal}°C` : "--",
      desc: getTempDesc(tempVal),
      color: "from-amber-500/20 to-orange-500/5 border-amber-500/30 text-amber-400",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: "Wind Speed",
      value: windVal !== null ? `${windVal} m/s` : "--",
      desc: getWindDesc(windVal),
      color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-400",
      icon: (
        <svg className="w-5 h-5 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )
    },
    {
      name: "Humidity",
      value: humidityVal !== null ? `${humidityVal}%` : "--",
      desc: getHumidityDesc(humidityVal),
      color: "from-blue-500/20 to-cyan-500/5 border-blue-500/30 text-blue-400",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      name: "Air Pressure",
      value: pressureVal !== null ? `${pressureVal} hPa` : "--",
      desc: getPressureDesc(pressureVal),
      color: "from-purple-500/20 to-pink-500/5 border-purple-500/30 text-purple-400",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Atmospheric Diagnostics</h3>
        <span className="text-[10px] text-slate-500 font-semibold bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          Real-time metrics
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {infoItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`glass-card p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all border bg-gradient-to-br ${item.color}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400">{item.name}</span>
                <div className="p-1.5 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5 text-inherit">
                  {item.icon}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-black text-white tracking-tight">{item.value}</p>
                <p className="text-slate-400 text-[10px] mt-1 font-semibold truncate uppercase tracking-wider">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Info;