import moment from "moment";
import WeatherIcon from "../WeatherIcon";
import { AiFillRightCircle } from "react-icons/ai"
import '../style.css'

const Forecast = ({ data }) => {

    const mydata = data;
    if (mydata == undefined) {
        return(
            <div className='forecast'>
                <p> - no data - </p>
            </div>
        )
    }
    
    return(
        <div>
            <div className='forecast'>
                <p>
                    <span style={{float:'left'}}>
                        <AiFillRightCircle size={10} style={{verticalAlign: 'middle'}}/>  
                        {moment(mydata.startTime).format('HH a')} - {moment(mydata.endTime).format('HH a')} 
                    </span>
                    <span className="icon-small">
                        <WeatherIcon code={data.weatherCode}></WeatherIcon>
                    </span>
                    <span style={{float:'right'}}>
                        {mydata.maxTemperature}° | {mydata.minTemperature}°
                    </span>
                    
                </p>
            </div>
        </div>
    )
}
export default Forecast