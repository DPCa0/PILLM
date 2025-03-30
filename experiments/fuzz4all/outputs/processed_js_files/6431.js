 

class Weather {
  constructor(location) {
    this.apiKey = 'your_api_key_here';
    this.location = location;
  }

  async fetchWeather() {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();
    return data;
  }
}

async function displayWeather(location) {
  try {
    const weather = new Weather(location);
    const data = await weather.fetchWeather();
    
     
    const { current: { temp_c, condition: { text } }, location: { name } } = data;
    
    print(`The current temperature in ${name} is ${temp_c}°C and the weather is ${text}.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

 
(async () => {
  await displayWeather('New York');
})();

Note: Replace `'your_api_key_here'` with an actual API key from WeatherAPI or any other weather service provider.