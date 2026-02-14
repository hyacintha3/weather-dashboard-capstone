function WeatherCard({ data }) {
    return (
      <div className="bg-white shadow-md rounded p-5 mt-5 w-80 text-center">
        <h2 className="text-xl font-bold mb-2">
          {data.name}
        </h2>
  
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
  
        <p>Temperature: {data.main.temp}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
      </div>
    );
  }
  
  export default WeatherCard;
  