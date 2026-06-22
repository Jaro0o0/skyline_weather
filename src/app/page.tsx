"use client"

import { get } from "http";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";


import Dashboard from "@/components/Dashboard/Dashboard";
import Cto from "@/components/Cto/Cto";

interface GeoData {
  lat: number;
  lon: number;
}



//ICONS

const icons = []




export default function Page() {
  const [geoData, setGeoData] = useState<GeoData>({ lat: 52.2297, lon: 21.0122 });

  const [weatherData, setWeatherData] = useState<any>(null);

  const [weekWeatherData,setWeekWeatherData] = useState<any[]>([]);

  const [view, setView] = useState<'Week' | 'Today'>('Week');




  const [cityInput, setCityInput] = useState('');

  const handleChange = () => {
    const city = cityInput.trim();
    if (!city) return;

    const getGeoData = async () => {
      try {
        const res = await fetch(`/api/latitude/${city}`);
        if (!res.ok) {
          const errData = await res.json();
          console.error('Geolocation API error:', errData);
          return;
        }
        const data = await res.json();
        console.log('Geo data:', data);
        setGeoData(data);
      } catch (err) {
        console.error('Failed to fetch geolocation:', err);
      }
    };
    getGeoData();
  };




  // WEATHER_DATA
  useEffect(() => {
    if (!geoData) return;
    const getCurrentWeather = async () => {
      const { lat, lon } = geoData;
      try {
        const res = await fetch(`/api/current/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        console.log(data);
        // Validate response shape before updating state
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
          console.error('Unexpected weather data shape:', data);
          setWeatherData(null);
        }
      } catch (err) {
        console.error('Failed to fetch current weather:', err);
        setWeatherData(null);
      }
    };
    getCurrentWeather();
  }, [geoData]);



  // WEEK
  useEffect(()=> {
    const getWeekWeather = async ()=>{
      const { lat, lon } = geoData;
      const res = await fetch(`/api/week?lat=${lat}&lon=${lon}`)
      const data = await res.json();

      const filteredList = data.list.filter(( item ) => item.dt_txt.includes("12:00:00"));
      setWeekWeatherData(filteredList);

      

     



      console.log(data)
    }
    getWeekWeather();

  },[])




  // half
  function halfString(str: string): string {
    
    const halfString = Math.floor(str.length / 2);

    const firstHalf = str.substring(0, halfString);
    const secondHalf = str.slice(halfString);

    return firstHalf + '\n' + secondHalf;
  }

  return (
    <main className="w-full h-screen relative overflow-hidden bg-neutral-600">
      {/* <video src='/videos/cloud.mp4' className="absolute inset-0 object-cover" autoPlay loop muted/> */}

      <div className="grid grid-cols-[1fr_3fr] h-full absolute inset-0">


        {/* SEARCH_COL */}
        <div className="p-4 bg-white/30 backdrop-blur-2xl  backdrop-blur-sm   h-full" >

      {/* INPUT_BOX */}
      <div className="flex">
          <input     onChange={(e) => setCityInput(e.target.value)}  onKeyDown={(e) => e.key === "Enter" && handleChange()} placeholder="searh " className="w-full"/>
  
                       
            
      </div>

        {/* DATA */}
        <div className="flex gap-4">
            <p className="text-4xl font-bold">{Math.round(weatherData?.temp || 0)}°C</p>

            <p>{weatherData?.icon}</p>
          </div>


              {/* WEEK PROGNOSE */}
              
                  {/* Add weekly forecast UI here */}
                  <div className="">
                    {weekWeatherData?.map((item,index)=>{
                      return(
                        <div key={index} className=" rounded-lg p-4 shadow hover:bg-white/40 transition-colors flex flex-col items-center">

                            

                             {/* Date (only the day part) */}
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.dt_txt.split(' ')[0]}</p>

                          {/* Weather icon */}
                          {item.weather?.[0]?.icon && (
                            <img
                              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              alt={item.weather[0].description}
                              className="w-12 h-12 mt-2"
                            />
                          )}

                          {/* Temperature – show high & low if present */}
                          {item.main?.temp && (
                            <p className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">{Math.round(item.main.temp)}°C</p>
                          )}
                          {item.main?.temp_min && item.main?.temp_max && (
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
                            </p>
                          )}

                          {/* Short description */}
                          {item.weather?.[0]?.description && (
                            <p className="mt-1 text-xs capitalize text-gray-600 dark:text-gray-400">
                              {item.weather[0].description}
                            </p>
                          )} 




                        </div>

                      )
                    })}
                </div>
         
        </div>




        {/* Dashboard_COL */}
        <div className="flex flex-col">
            
             <Dashboard weatherData={weatherData} weekWeatherData={weekWeatherData}/>
         </div>
        
     
        
        </div>
      
    </main>
  );
}
