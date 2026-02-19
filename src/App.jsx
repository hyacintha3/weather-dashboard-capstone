import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [recentCities, setRecentCities] = useState([]);

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

      // Save recent searches
      const updatedCities = [
        city,
        ...recentCities.filter((c) => c !== city),
      ].slice(0, 5);

      setRecentCities(updatedCities);
      localStorage.setItem("recentCities", JSON.stringify(updatedCities));
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities"));
    if (storedCities) {
      setRecentCities(storedCities);
    }

    fetchWeather("Kigali");
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Weather Dashboard</h1>

      <SearchBar onSearch={fetchWeather} />

      {error && <ErrorMessage message={error} />}

      {weather && (
        <>
          <WeatherCard data={weather} />

          {/* Refresh Button */}
          <button
            onClick={() => fetchWeather(weather.name)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </>
      )}

      {/* Recent Searches */}
      {recentCities.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Recent Searches:</h2>
          <div className="flex gap-2 flex-wrap">
            {recentCities.map((city, index) => (
              <button
                key={index}
                onClick={() => fetchWeather(city)}
                className="bg-gray-200 px-3 py-1 rounded"
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
