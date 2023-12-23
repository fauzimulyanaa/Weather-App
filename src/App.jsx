/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";

import LocationIcon from "./assets/location.png";
import ClearSky from "./assets/clear-sky.png";
import FewClouds from "./assets/few-clouds.png";
import Cloud from "./assets/cloud.png";
import BrokenCloud from "./assets/broken-cloud.png";
import Rain from "./assets/rain.png";
import CloudyRain from "./assets/cloudy.png";
import Storm from "./assets/storm.png";
import Snow from "./assets/snowflake.png";
const apiKey = import.meta.env.VITE_SOME_KEY;

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    }
  };

  const handleImage = (status) => {
    if (status === "clear sky") {
      return ClearSky;
    } else if (status === "few clouds") {
      return FewClouds;
    } else if (status === "scattered clouds") {
      return Cloud;
    } else if (status === "broken clouds" || status === "overcast clouds") {
      return BrokenCloud;
    } else if (status === "shower rain") {
      return Rain;
    } else if (status === "rain") {
      return CloudyRain;
    } else if (status === "thunderstorm") {
      return Storm;
    } else if (status === "snow") {
      return Snow;
    } else {
      return FewClouds;
    }
  };

  return (
    <>
      <div className="container-fluid bg-[url('./src/assets/sky.jpg')]">
        <div className="h-[100vh] py-2  overflow-hidden md:max-w-[400px] m-auto md:rounded-3xl bg-opacity-10 ">
          <div className="flex justify-center ">
            <input
              type="text"
              className="bg-transparent border-b border-white-500 focus:outline-none focus:border-blue-500 px-4 pt-8 pb-4 placeholder-white text-white text-2xl"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <div className="location flex py-5 px-8 gap-2 justify-center items-center">
            <img src={LocationIcon} className="w-[30px]"></img>
            <h2 className="text-4xl text-white font-medium">{data.name ? data.name : "City"}</h2>
          </div>
          <div className="status flex flex-col items-center">
            <img src={data.weather ? handleImage(data.weather[0].description) : handleImage("few clouds")} className="w-[120px]"></img>
            <h1 className="text-4xl py-3 font-bold text-white">{data.main ? data.main.temp.toFixed() : null}°F</h1>
            <p className="text-3xl text-white font-bold">{data.weather ? data.weather[0].description : "Cloud"}</p>
          </div>
          <div className="desc bg-white bg-opacity-15 md:py-8 md:px-8 md:mt-6 md:h-[200px] h-full pt-14 mt-8 px-8 rounded-3xl">
            <div className="feels flex justify-between items-center mb-3">
              <p className="text-2xl font-bold text-white">Feels Like</p>
              <p className="text-white font-bold text-2xl">{data.main ? data.main.feels_like.toFixed() : null}°</p>
            </div>
            <div className="feels flex flex-row justify-between items-center mb-3">
              <p className="text-2xl font-bold text-white">Humidity</p>
              <p className="text-white font-bold text-2xl">{data.main ? data.main.humidity.toFixed() : null}%</p>
            </div>
            <div className="feels flex flex-row justify-between items-center">
              <p className="text-2xl font-bold text-white">Wind N</p>
              <p className="text-white font-bold text-2xl">{data.wind ? data.wind.speed.toFixed() : null} mph</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
