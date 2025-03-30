 

class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.weatherapi.com/v1';
    }

    async fetchWeather(city) {
        const response = await fetch(`${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
}

const showWeather = async (city) => {
    try {
        const apiKey = 'your_api_key_here';  
        const weatherService = new WeatherService(apiKey);
        const { location: { name, region, country }, current: { temp_c, condition: { text } } } = await weatherService.fetchWeather(city);
        
        print(`Weather in ${name}, ${region}, ${country}: ${temp_c}°C, ${text}`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

 
showWeather('New York');

 
(async () => {
    const { nanoid } = await import('nanoid');
    print(`Generated ID: ${nanoid()}`);
})();
