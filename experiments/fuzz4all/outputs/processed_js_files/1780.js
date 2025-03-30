 

class WeatherAPI {
    static fetchWeatherData(city) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = {
                    city,
                    temperature: (Math.random() * 10 + 20).toFixed(2),
                    condition: 'Sunny'
                };
                resolve(data);
            }, 1000);
        });
    }
}

async function getWeatherReport(city) {
    try {
        const { temperature, condition, ...rest } = await WeatherAPI.fetchWeatherData(city);
        return `The weather in ${rest.city} is ${condition} with a temperature of ${temperature}°C.`;
    } catch (error) {
        return 'Could not retrieve weather data.';
    }
}

(async () => {
    const cities = ['New York', 'Los Angeles', 'Chicago'];
    const weatherReports = await Promise.all(cities.map(getWeatherReport));
    print(...weatherReports);
})();
