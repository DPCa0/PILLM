 

class WeatherFetcher {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.weatherapi.com/v1/current.json';
    }

    async fetchWeather(city) {
        const response = await fetch(`${this.baseUrl}?key=${this.apiKey}&q=${city}`);
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
        return await response.json();
    }
}

const getWeatherData = async (city) => {
    const fetcher = new WeatherFetcher('YOUR_API_KEY_HERE');
    try {
        const { location: { name }, current: { temp_c, condition: { text } } } = await fetcher.fetchWeather(city);
        print(`The weather in ${name} is ${text} with a temperature of ${temp_c}°C.`);
    } catch (error) {
        console.error(error.message);
    }
};

(async () => {
     
    const cities = new Set(['New York', 'Los Angeles', 'Chicago']);
    const requests = [...cities].map(getWeatherData);
    await Promise.all(requests);
})();

 
const cityInputHandler = {
    set: function(target, property, value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('City name must be a non-empty string');
        }
        target[property] = value.trim();
        return true;
    }
};

const cityInput = new Proxy({}, cityInputHandler);
cityInput.name = 'San Francisco';  
 
