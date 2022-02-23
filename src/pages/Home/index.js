import { useState, useEffect } from "react";
import moment from "moment";
import Controller from "./components/Controller";
import Weather from "./components/Weather";
import './style.css'

const Home = () => {
    const [location, setLocation] = useState('高雄')
    const [daytime, setDaytime] = useState(moment().hour())

    const day ={
        morning: 'linear-gradient( 135deg, rgb(063, 173, 208) 10%, rgb(108, 185, 211) 100%)',
        noon: 'linear-gradient( 135deg, rgb(249, 215, 118) 10%, rgb(244, 165, 132) 100%)',
        evening: 'linear-gradient( 135deg, rgb(043, 082, 111) 10%, rgb(073, 066, 118) 100%)'
    } 

    useEffect(() => {
        setDaytime(moment().hour())
    }, [])

    useEffect(()=>{
        if(daytime >= 5 && daytime < 15 ){
            console.log('白天')
            document.getElementById('App').style.background=day.morning
        }
        else if(daytime >= 15 && daytime < 21){
            console.log('傍晚')
            document.getElementById('App').style.background=day.noon
        }
        else{
            console.log('晚上')
            document.getElementById('App').style.background=day.evening
        }
    }, [daytime])

    const getCurrentTime = () => {
        return moment().format('MMMM Do')
    }

    console.log('current = ' + location)

    return(
        <div className="Container">
            <div className="App" id='App'>
                <Controller currentLocation={location} setCurrentLocation={setLocation}></Controller>
                <div className="tag">
                    <p style={{fontSize:'12px'}}>{ getCurrentTime() }</p>
                    <p style={{fontSize:'25px'}}>{moment().format('H:mm a')}</p>
                </div>
                <Weather currentLocation={location}></Weather>
                <p className="footer">react app demo</p>
            </div>
        </div>

        
    )
}
export default Home