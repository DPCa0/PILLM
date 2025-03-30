 
class WeatherFetcher {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async fetchWeather(city) {
        try {
            const response = await fetch(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`);
            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }
            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }

    formatWeatherData(data) {
        const { name, main: { temp, humidity }, weather: [{ description }] } = data;
        const celsiusTemp = (temp - 273.15).toFixed(2);
        return `Weather in ${name}: ${description}, Temp: ${celsiusTemp}°C, Humidity: ${humidity}%`;
    }
}

 
async function displayWeatherForCities(cities) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const weatherFetcher = new WeatherFetcher(apiKey);

    const cityIterator = cities[Symbol.iterator]();

    for await (const city of cityIterator) {
        const weatherInfo = await weatherFetcher.fetchWeather(city);
        print(weatherInfo);
    }
}

 
const cities = ['New York', 'London', 'Tokyo', 'Sydney'];
displayWeatherForCities(cities);
