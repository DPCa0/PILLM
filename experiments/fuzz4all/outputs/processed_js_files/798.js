 
async function* fetchWeatherData(cities) {
  for (const city of cities) {
    const response = await fetch(`https: 
    if (response.ok) {
      const data = await response.json();
      yield { city, temperature: data.current.temp_c };
    }
  }
}

 
const defaultTemperatureHandler = {
  get: (target, prop) => (prop in target ? target[prop] : 'Data not available')
};

 
let weatherMap = new Map();

 
(async () => {
  const cities = ['New York', 'London', 'Tokyo'];
  const weatherData = fetchWeatherData(cities);

  for await (const weather of weatherData) {
    weatherMap.set(weather.city, weather.temperature);
  }

   
  const proxyWeatherMap = new Proxy(weatherMap, defaultTemperatureHandler);

   
  cities.forEach(city => {
    print(formatWeather`The temperature in ${city} is ${proxyWeatherMap.get(city)}°C`);
  });
})();

 
function formatWeather(strings, city, temperature) {
  return `${strings[0]}${city}${strings[1]}${temperature}`;
}
