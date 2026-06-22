function Cto({ weatherData, weekWeatherData }: { weatherData: any; weekWeatherData: any[] }) {
    return (  
        <div className="rounded-3xl overflow-hidden max-w-2xl relative h-96 shadow">
            
            {/* TEXT_BOX */}
            <div className="absolute  flex flex-col justify-between  inset-0 p-4">
                {/* LOCATION_BOX */}
                <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p>{weatherData?.location}</p>
                </div>

                {/* DESC */}
                <div className="flex justify-between items-center">
                    <div>
                        <span>Today</span>
                        <p className="text-white text-2xl font-bold">{weatherData?.description}</p>
                    </div>
                  
                    <p>{weatherData?.icon}</p>
                </div>

            </div>

            <video src='/videos/cloud.mp4' className="w-full h-full object-cover" autoPlay loop muted/>
        </div>
    );
}

export default Cto;