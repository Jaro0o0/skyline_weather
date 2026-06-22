import { useEffect, useState,} from "react";
import Cto from "../Cto/Cto";
import Info from "../Info/Info";



function Dashboard({ weatherData, weekWeatherData }: { weatherData: any; weekWeatherData: any[] }) {
    
    
    return ( 


        
        <div className="w-full flex flex-col justify-between overflow-y-auto max-h-screen p-8 h-screen">
          
            <div className=" flex flex-col justify-between  h-full">


        
            


    
           

              {/* CTO */}
              <Cto weatherData={weatherData} weekWeatherData={weekWeatherData}/>






             
                
                <Info weatherData={weatherData}/>
            
          
              


                
              
            </div>
          
        </div>


     );
}

export default Dashboard;