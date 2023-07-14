import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [diff, setDiff] = useState(0);
    const lat = '30.61583196421116';
    const lon = '-96.33789743085983';
    const API_KEY = '80b9a86755c11d4745d1eae1dc48da54';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                setWeatherData(result.data);
                setLastUpdated(new Date());
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 300000 ms = 5 minutes
        return () => clearInterval(interval); // This is cleanup to stop the interval when the component unmounts
    }, [lat, lon]);

    useEffect(() => {
        const timer = setInterval(() => {
            setDiff(()=>  Math.floor((new Date().getTime() - lastUpdated.getTime())/1000)); // Increment by one second
        }, 1000);

        return () => clearInterval(timer); // Clear on unmount
    }, []);

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
                {`Updated ${diff} seconds ago`}
            </div>
        </div>
    );
}

export default WeatherDisplay;
