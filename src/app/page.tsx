"use client"

import { get } from "http";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

interface GeoData {
  lat: number;
  lon: number;
}



//ICONS

const icons = []




export default function Page() {
  const [geoData, setGeoData] = useState<GeoData>({ lat: 52.2297, lon: 21.0122 });

  const [weatherData, setWeatherData] = useState<any>(null);

  const [weekWeatherData,setWeekWeatherData] = useState([]);

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
    <main className="w-full h-screen relative overflow-hidden">
      <video src='/videos/cloud.mp4' className="absolute inset-0 object-cover" autoPlay loop muted/>

      <div className="grid grid-cols-[1fr_3fr] h-full absolute inset-0">


        {/* SEARCH_COL */}
        <div className="p-4 bg-white/30 backdrop-blur-2xl  backdrop-blur-sm   h-full" >

      {/* INPUT_BOX */}
      <div className="flex">
          <input     onChange={(e) => setCityInput(e.target.value)}  onKeyDown={(e) => e.key === "Enter" && handleChange()} placeholder="searh " className="w-full"/>
  
                       
            
      </div>

        {/* DATA */}
        <div className="flex gap-4">
            <p>{Math.round(weatherData?.temp || 0)}°C</p>

            <p>{weatherData?.icon}</p>
          </div>
         
        </div>
        {/* Dashboard_COL */}
        <div className="w-full flex flex-col justify-between overflow-y-auto max-h-screen p-4 h-screen">
          {view === "Week" && (
            <div className=" flex flex-col justify-between  h-full">


              <div className="flex space-x-4">
                <button onClick={() => setView('Week')}>Week</button>
                <button onClick={() => setView('Today')}>Today</button>
              </div>



              
              {/* Text_BOX */}
              <div className=" flex-1 flex flex-col gap-4  justify-center space-y-2 mb-4">



                <h1 className="text-4xl font-bold">{weatherData?.description}</h1>
              </div>

              <div className=" flex-1 flex flex-col gap-4  justify-center space-y-2 mb-4">
                <h1 className="text-4xl font-bold">{weatherData?.temp}°C</h1>
                <h1 className="text-2xl font-bold">{weatherData?.location}</h1>
                <h1 className="text-2xl font-bold">{weatherData?.description}</h1>
              </div>


              {/* WEEK PROGNOSE */}
              
                  {/* Add weekly forecast UI here */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  flex-1">
                    {weekWeatherData?.map((item,index)=>{
                      return(
                        <div key={index} className="bg-white/30 backdrop-blur-3xl p-4">

                            

                             <p>{item.dt_txt}</p> 




                        </div>

                      )
                    })}
                </div>
                
              
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
