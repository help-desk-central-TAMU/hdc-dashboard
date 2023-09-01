import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config.json'
// Read the file and convert it to a JavaScript object to get the API key

const WeatherDisplay = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [diff, setDiff] = useState("");
    const lat = '30.61583196421116';
    const lon = '-96.33789743085983';
    const API_KEY = config.openWeatherMapApiKey;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                setWeatherData(result.data);
                console.log('Fetched weather data')
                let tempDate = new Date()
                let amOrPm = ((tempDate.getHours() / 12) > 0)? " PM" : " AM"
                setDiff(tempDate.getHours() % 12 + ":" + twoDigits(tempDate.getMinutes()) + amOrPm)
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000); // 300000 ms = 5 minutes
        return () => clearInterval(interval); // This is cleanup to stop the interval when the component unmounts
    }, [lat, lon]);

    if (!weatherData) return <div>Loading...</div>;

    const feelsLikeFahrenheit = (weatherData.main.feels_like - 273.15) * 9/5 + 32;
     // convert ms to seconds

    return (
        <div>
            <div className={"time-panel-text"}>
                {feelsLikeFahrenheit.toFixed(1)}°F
            </div>
            <div className={"date-panel-text"}>
                {"Feels Like"}
            </div>
            <div className={"update-panel-text"}>
                {`Updated ${diff}`}
            </div>
        </div>
    );
}

function twoDigits(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}
export default WeatherDisplay;
