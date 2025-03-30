 

class Weather {
  constructor(location) {
    this.location = location;
  }
  
   
  async fetchWeather() {
     
    const fakeAPI = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ temp: 72, condition: 'Sunny', windSpeed: 10 });
      }, 2000);
    });
    const weatherData = await fakeAPI;
    return weatherData;
  }
}

async function displayWeatherInfo() {
  const location = "San Francisco";
  const weatherInstance = new Weather(location);
  const { temp, condition, windSpeed } = await weatherInstance.fetchWeather();
  
  print(`The current weather in ${location} is:`);
  print(`Temperature: ${temp}°F`);
  print(`Condition: ${condition}`);
  print(`Wind Speed: ${windSpeed} mph`);
}

displayWeatherInfo();
