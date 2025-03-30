 
class WeatherService {
    constructor() {
        this.apiKey = 'YOUR_API_KEY';  
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async fetchWeather(city) {
        try {
            const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.apiKey}`);
            if (!response.ok) throw new Error('Failed to fetch weather data');
            const data = await response.json();
            return this.extractWeatherData(data);
        } catch (error) {
            console.error(`Error fetching weather data: ${error.message}`);
        }
    }

    extractWeatherData(data) {
        const {
            main: { temp, humidity },
            weather: [{ description }],
            wind: { speed },
            sys: { country },
            name: city
        } = data;
        return { temp, humidity, description, speed, country, city };
    }
}

(async () => {
    const cities = ['London', 'New York', 'Tokyo'];
    const weatherService = new WeatherService();

    const weatherPromises = cities.map(city => weatherService.fetchWeather(city));
    const weatherDataArray = await Promise.all(weatherPromises);

    weatherDataArray.forEach(weatherData => {
        if (weatherData) {
            const { city, country, temp, humidity, description, speed } = weatherData;
            print(`Weather in ${city}, ${country}:`);
            print(`Temperature: ${temp}°K, Humidity: ${humidity}%`);
            print(`Conditions: ${description}, Wind Speed: ${speed}m/s`);
            print('---------------------------------');
        }
    });
})();
