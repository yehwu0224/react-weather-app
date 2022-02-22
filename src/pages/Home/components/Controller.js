import { useState } from "react"
import '../style.css'

const Controller = ({ currentLocation, setCurrentLocation }) => {
    const [location, setLocation] = useState(currentLocation)

    const handleChange = (e) => {
        console.log(e.target.value)
        setLocation(e.target.value) // 
        setCurrentLocation( e.target.value ) //在切換選擇時更改 location 的 state
    }

    return(
        <div>
            <select value={location} onChange={handleChange} className="Dropdown">
                <option value="高雄">Kaohsiung</option>
                <option value="臺北">Taipei</option>
                <option value="臺中">Taichung</option>
                <option value="嘉義">Chaiyi</option>
            </select>
        </div>
    )
}
export default Controller