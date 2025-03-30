 

class Weather {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  }
  
  async fetchWeather(city) {
    const response = await fetch(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
    if (!response.ok) throw new Error('Weather data fetch failed');
    const data = await response.json();
    return this.processWeatherData(data);
  }

  processWeatherData({ weather, main: { temp }, name }) {
    const [{ description }] = weather;  
    return { city: name, description, temperature: temp };
  }
}

async function displayWeather(city) {
  const apiKey = 'your_api_key_here';
  const weatherInstance = new Weather(apiKey);

  try {
    const { city, description, temperature } = await weatherInstance.fetchWeather(city);
    print(`Weather in ${city}: ${description}, ${temperature}°C`);
  } catch (error) {
    console.error(error.message);
  }
}

const cities = ['New York', 'Los Angeles', 'Chicago'];

Promise.all(cities.map(city => displayWeather(city)))
  .then(() => console.log('Weather information retrieved successfully'))
  .catch(err => console.error('An error occurred:', err));
