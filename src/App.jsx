import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = "65de24904e35fb415cb41dc19d5bece4";

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
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  
  useEffect(() => {
    fetchWeather("Kigali");
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Weather Dashboard</h1>

  
      <SearchBar onSearch={fetchWeather} />

      {error && <ErrorMessage message={error} />}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
