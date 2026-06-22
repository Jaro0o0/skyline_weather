



function Info({ weatherData }: { weatherData: any }) {


const infoItems = [
    {
        name:'temperature',
        src: weatherData?.temp,

    },
    {
        name:'wind speed',
        src: weatherData?.wind.speed,

    },
    {
        name:'humidity',
        src: weatherData?.humidity,

    },
     {
        name:'pressure',
        src: weatherData?.pressure,

    },
]



    return (
        <>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow">
                 <div className="container mx-auto">

                    <div>
                        <h1>Air Info</h1>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-2 gap-4">

                        {infoItems.map((item,index)=>{
                            return(
                                <div key={index} className="p-4 text-center">
                                    <p className="text-white text-2xl">{item.name}</p>
                                    <p>{item.src}</p>
                                </div>
                            )
                        })}
                    
                    </div>
                 </div>

            </div>
        </>
      );
}

export default Info;