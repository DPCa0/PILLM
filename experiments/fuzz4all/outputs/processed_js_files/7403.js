 

class WeatherService {
    static getWeatherData(city) {
         
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = {
                    city: city,
                    temperature: (Math.random() * 30 + 1).toFixed(2),
                    condition: Math.random() > 0.5 ? 'Sunny' : 'Cloudy'
                };
                resolve(data);
            }, 2000);
        });
    }
}

async function displayWeather(city) {
    try {
        const { city: c, temperature: temp, condition: cond } = await WeatherService.getWeatherData(city);
        print(`The weather in ${c} is ${cond} with a temperature of ${temp}°C.`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function runProgram(cities) {
    print('Fetching weather data...');
    cities.forEach(city => displayWeather(city));
}

const cities = ['New York', 'London', 'Tokyo', 'Sydney'];
runProgram(cities);
