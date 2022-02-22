import { useState, useEffect } from "react"
import { WiWindy, WiHumidity } from "react-icons/wi"
import axios from "axios"
import WeatherIcon from "../WeatherIcon";
import Forecast from "./Forecast";

const Weather = ({ currentLocation }) => {

    const location = currentLocation;
    const [data, setData] = useState({
        locationName: '',
        weatherCode: 1,
        forecast: []
    });

    const fetchForecastData = ( location ) => {
        return axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-4943FB9A-E577-4813-9810-8A191171D89A&locationName=' + location + '市')
            .then(res => {
                //console.log(res)
                const locationData = res.data.records.location[0];
                const weatherElements = locationData.weatherElement.reduce(
                    ( targetElement, item ) => {
                        targetElement[item.elementName] = item.time;                    
                        return targetElement;
                    }
                );
                const forecastData = [];
                for(let i = 0; i < 3; i++){
                    const itemData = {
                        startTime: weatherElements.time[i].startTime,
                        endTime: weatherElements.time[i].endTime,
                        description: weatherElements.time[i].parameter.parameterName,
                        weatherCode: weatherElements.time[i].parameter.parameterValue,
                        rainPossibility: weatherElements.PoP[i].parameter.parameterName,
                        maxTemperature: weatherElements.MaxT[i].parameter.parameterName, 
                        minTemperature: weatherElements.MinT[i].parameter.parameterName
                    }
                    forecastData.push(itemData)
                }
                console.log('456', forecastData)
                return forecastData;
            })
            .catch(err => console.log(err));

    }
    const fetchWeatherData = ( location ) => {
        return axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-4943FB9A-E577-4813-9810-8A191171D89A&locationName=`+location)
            .then(res => {
                //console.log(res)
                const locationData = res.data.records.location[0];
                const weatherElements = locationData.weatherElement.reduce(
                    ( targetElement, item ) => {
                        targetElement[item.elementName] = item.elementValue;
                        return targetElement;
                    }
                );
                const currentWeatherData = {
                    observationTime: locationData.time.obsTime,
                    locationName: locationData.locationName,
                    description: '多雲時晴',
                    weatherCode: '1',
                    temperature: weatherElements.TEMP,
                    windSpeed: weatherElements.WDSD,
                    humid: weatherElements.HUMD,
                    forecast: []
                };
                return currentWeatherData;
            })
            .catch(err => console.log(err))
    }

    useEffect( async ()=>{     //在data有變動時渲染
        const cw = await fetchWeatherData( location )
        const fd = await fetchForecastData( location )
        cw.description = fd[0].description;
        cw.weatherCode = fd[0].weatherCode;
        cw.forecast = fd;
        setData(cw)
    }, [location])

    useEffect( async () => {   //初次渲染
        const cw = await fetchWeatherData( location )
        const fd = await fetchForecastData( location )
        cw.description = fd[0].description;
        cw.weatherCode = fd[0].weatherCode;
        cw.forecast = fd;
        setData(cw)
    },[])

    const getData = ( index ) => {
        if(data.forecast == null) return;
        else return data.forecast[index]; 
    }

    return(
        <div>
            <div className="icon">
                <WeatherIcon code={data.weatherCode} />
            </div>
            
            <div className="temp">
                <p>
                    {Math.round(data.temperature)} 
                    <span>°C</span>
                </p>
            </div>
            <div className="info">
                <p style={{margin:'0 0'}}>
                    <WiWindy style={{verticalAlign: 'bottom'}}/> 
                    <span>{data.windSpeed} m/h   |   </span>
                    <WiHumidity style={{verticalAlign: 'bottom'}}/>
                    <span>{data.humid * 100} %</span>
                </p>
            </div>
            <hr className="hrstyle"></hr>
            
            <Forecast data={getData(1)}></Forecast>
            <Forecast data={getData(2)}></Forecast>
        </div>
    )
}
export default Weather

