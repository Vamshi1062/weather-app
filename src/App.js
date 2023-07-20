import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Current } from './components/Current';
import './index.css'

function App() {

  const[data,setData]=useState({})
  const[location,setLocation]=useState('')
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=dc286ce0e463a3735cdb197697c3545c`
  
  const searchLocation=(event)=>{
    if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
      })
      .catch((error)=>{
        console.log('error occured',error)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
       <h1 className="weath">Weather App</h1>
       <h2 className="weather">Current Location Weather</h2>
      <Current/>
       <div className='search'>
        <input value={location} onChange={event=>setLocation(event.target.value)} onKeyPress={searchLocation}
        placeholder='Enter Location' type='text' size={50} />
       </div>
       <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main?<h1>{data.main.temp.toFixed()}°C</h1>:null}
          </div>
          <div className='description'>
            {data.weather?<p>{data.weather[0].main}</p>:null}
          </div>
        </div>
        {data.name!==undefined&&
        <div className='bottom'>
          <div className='feels'>
            {data.main?
            (
              <>
                <i className="fas fa-thermometer-half"></i>
                <p className='bold'> {data.main.feels_like.toFixed()}°C</p></>):null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main?(
            <>
            <i className="fas fa-tint"></i>
            <p className='bold'>{data.main.humidity}%</p>
            </>):null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind?(
            <>
            <i className="fas fa-wind"></i>
            <p className='bold'>{data.wind.speed.toFixed()}MPS</p></>):null}
            <p>Wind Speed</p>
          
          </div>
        </div>
        }
       </div>
    </div>
  );
}

export default App;
