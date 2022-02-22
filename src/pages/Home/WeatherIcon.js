import { useState, useEffect } from "react";
import './style.css';
import isCloudy from './../../images/cloudy.png';
import isSunny from './../../images/sun.png';
import isRain from './../../images/rain.png';
import isThunderstorm from './../../images/heavy-rain.png'
import isSnowing from './../../images/snow.png'



const WeatherIcon = ({ code }) => {

  const [currentCode, setCurrentCode] = useState(code)
  
  const weatherTypes = {
    isSunny: [1],
    isCloudy: [2, 3, 4, 5, 6, 7, 24, 25, 26, 27, 28],
    isRain: [
      8, 9, 10, 11, 12,
      13, 14, 19, 20, 29, 30,
      31, 32, 38, 39,
    ],
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isSnowing: [23, 37, 42],
  };
  
  function getKeyByValue(object, value) {
    //console.log('value=' + value)
    return Object.keys(object).find(key => object[key].includes(value));
  }

  const getIcon = () => {
    const str = getKeyByValue(weatherTypes, Number(code))
    if (str == 'isCloudy') return isCloudy;
    else if (str == 'isSunny') return isSunny;
    else if (str == 'isRain') return isRain;
    else if (str == 'isThunderstorm') return isThunderstorm;
    else if (str == 'isSnowing') return isSnowing;
    else return ; 
  }
  
  return(
      <img src={getIcon()} alt="cloudy"/>
  )
}
export default WeatherIcon