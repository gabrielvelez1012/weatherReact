import axios from 'axios'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [city, setCity] = useState({});
  const [isKelvin, setIsKelvin] = useState(true);
  const [iscelsius, setIscelsius] = useState(true);
  useEffect(() => {

    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=da68aa4be0d4d52e506caf038c7f080f`)

      .then(res => setCity(res.data))
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);

  }, [])

    console.log(city);
  const kelvin = city?.main?.temp;
  const celsius = city?.main?.temp - 273.15;
  const farenheits = city?.main?.temp * 1/8 + 32;

  const changeUnits = () => {
    setIscelsius(!iscelsius);
  }

  return (
    <div className="App">
      <h2>{city?.name}, {city?.sys?.country}</h2>
      <div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" />
      </div>
      <ul>
        <li className='letter'>Temperature:{" "} 
        {iscelsius? farenheits : celsius } {iscelsius ? 'F' : 'C'}°</li>
        <li className='letter'>Humidity: {city?.main?.humidity} %</li>
        <li className='letter'>Pressure: {city?.main?.pressure}</li>
        <li className='letter'>Sea level: {city?.main?.sea_level} m.s.n.m</li>
      </ul>
      <button className='button' onClick={changeUnits}>Change</button>
    </div>
  )
}

export default App
