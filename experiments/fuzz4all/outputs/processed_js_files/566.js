 
class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.weatherapi.com/v1/current.json';
    }

    async fetchWeather(location) {
        const response = await fetch(`${this.apiUrl}?key=${this.apiKey}&q=${location}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');
        return response.json();
    }
}

class WeatherApp {
    constructor(apiKey) {
        this.weatherService = new WeatherService(apiKey);
    }

    async displayWeather(location) {
        try {
            const { location: loc, current: { temp_c, condition: { text } } } = await this.weatherService.fetchWeather(location);
            print(`The weather in ${loc.name}, ${loc.region} is ${temp_c}°C with ${text}.`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

const apiKey = 'your_api_key_here';  
const app = new WeatherApp(apiKey);
app.displayWeather('New York');
