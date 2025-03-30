 
class WeatherFetcher {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async fetchWeather(city) {
        const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.apiKey}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        return this._extractWeatherData(data);
    }

    _extractWeatherData({ weather: [{ description }], main: { temp, humidity }, wind: { speed } }) {
        return { description, temp, humidity, speed };
    }
}

const displayWeather = async (city) => {
    try {
        const apiKey = 'your_api_key_here';
        const weatherFetcher = new WeatherFetcher(apiKey);
        const { description, temp, humidity, speed } = await weatherFetcher.fetchWeather(city);

        print(`Weather in ${city}:`);
        print(`Description: ${description}`);
        print(`Temperature: ${(temp - 273.15).toFixed(2)}°C`);
        print(`Humidity: ${humidity}%`);
        print(`Wind Speed: ${speed} m/s`);
    } catch (error) {
        console.error(error.message);
    }
};

const cities = ['New York', 'London', 'Tokyo'];
cities.forEach(displayWeather);
