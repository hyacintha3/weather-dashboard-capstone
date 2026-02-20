import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

// Background images for different weather conditions
import clearBg from "./assets/images/clear-bg.jpg";
import cloudyBg from "./assets/images/cloudy-bg.jpg";
import rainBg from "./assets/images/rain-bg.jpg";
import snowBg from "./assets/images/snow-bg.jpg";
import stormBg from "./assets/images/storm-bg.jpg";
import mistBg from "./assets/images/mist-bg.jpg";

function App() {
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(""); 
  const [recentCities, setRecentCities] = useState([]);

  const API_KEY = "65de24904e35fb415cb41dc19d5bece4";

  // Function to fetch weather for a city
  const fetchWeather = async (city) => {
    try {
      setError(""); 

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

      // Save recent searches (max 5)
      const updatedCities = [city, ...recentCities.filter((c) => c !== city)].slice(0, 5);
      setRecentCities(updatedCities);
      localStorage.setItem("recentCities", JSON.stringify(updatedCities));
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Load recent searches from localStorage & fetch default city
  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities"));
    if (storedCities) setRecentCities(storedCities);

    fetchWeather("Kigali");
  }, []);

  // Determine background image based on weather condition
  const getBackgroundImage = () => {
    if (!weather) return clearBg;

    const condition = weather.weather[0].main;
    switch (condition) {
      case "Clear":
        return clearBg;
      case "Clouds":
        return cloudyBg;
      case "Rain":
        return rainBg;
      case "Snow":
        return snowBg;
      case "Thunderstorm":
        return stormBg;
      case "Mist":
      case "Haze":
      case "Fog":
        return mistBg;
      default:
        return clearBg;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-5 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <h1 className="text-3xl font-bold mb-5 text-white drop-shadow-lg">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={fetchWeather} />

      {error && <ErrorMessage message={error} />}

      {weather && (
        <>
          <WeatherCard data={weather} />

          {/* Refresh Button */}
          <button
            onClick={() => fetchWeather(weather.name)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Refresh
          </button>
        </>
      )}

      {/* Display recent searches */}
      {recentCities.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2 text-white drop-shadow-lg">Recent Searches:</h2>
          <div className="flex gap-2 flex-wrap">
            {recentCities.map((city, index) => (
              <button
                key={index}
                onClick={() => fetchWeather(city)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
