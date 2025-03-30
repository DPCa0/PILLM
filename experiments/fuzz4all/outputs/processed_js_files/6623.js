class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async fetchWeather(city) {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Failed to fetch weather data.');
    const data = await response.json();
    return data.current;
  }
}

const logWeather = async (city) => {
  try {
    const api = new WeatherAPI('your_api_key_here');
    const weather = await api.fetchWeather(city);
    const { temp_c, condition: { text } } = weather;
    print(`The current temperature in ${city} is ${temp_c}°C with ${text}.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const cities = ['New York', 'London', 'Tokyo', 'Sydney'];

(async () => {
  for await (const city of cities) {
    await logWeather(city);
  }
})();
