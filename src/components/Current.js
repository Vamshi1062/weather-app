import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
export const Current = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const fetchCurrentWeather =  (latitude, longitude) => {
       axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=dc286ce0e463a3735cdb197697c3545c`)
          
          .then((response)=>{
          setCurrentWeather(response.data);})
          .catch((err)=>{
            console.log('error occured ',err)
          })
      };
    
      // Get the user's current location
      const getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchCurrentWeather(latitude, longitude);
            },
            (error) => {
              console.error('Error getting current location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
    
      // Fetch weather for the current location on component mount
      useEffect(() => {
        getCurrentLocation();
      }, []);
    return (
        <div>
             {currentWeather && (
            <div className="weather-container">
    <p className="temperature"><i className="fas fa-map-marker-alt"></i> Location: {currentWeather.name}</p>
    <p className="temperature"><i className="fas fa-thermometer-half"></i> Temperature: {currentWeather.main.temp}°C</p>
    <p className="humidity"><i className="fas fa-tint"></i> Humidity: {currentWeather.main.humidity}%</p>
    <p className="wind-speed"><i className="fas fa-wind"></i> Wind Speed: {currentWeather.wind.speed} MPS</p>
  </div>
)}
        </div>
    )
}
