
import React, { useState } from 'react';
import './Weather.css'
const api = {
    key: "9ce0e8ff15bdc00d1b4819ff9f6d1399",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const search = evt => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
        }
    }
    const dateBuilder = (d) => {
        let months = ["january", "February", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"];
        let Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let month = months[d.getMonth()];
        let day = Days[d.getDay()];
        let date = d.getDate();
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;

    }
    return (
        <div>
            <main>
                <div className='SearchBox'>
                    <input type='text' className='SearchBar' placeholder='Search...' value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div className='location-box'>
                        <div className='location'>
                            {weather.name}, {weather.sys.country}
                            <div className='date' >
                                {dateBuilder(new Date())}
                            </div>
                            <div className='temp'>
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className='weather'>
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : ('')}

            </main>
        </div>
    )
}
export default Weather