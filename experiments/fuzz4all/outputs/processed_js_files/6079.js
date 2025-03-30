const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
};

const processData = (data) => {
    const { current, location } = data;
    return {
        city: location.name,
        tempC: current.temp_c,
        condition: current.condition.text,
    };
};

const displayWeather = ({ city, tempC, condition }) => {
    print(`Current weather in ${city}:`);
    print(`Temperature: ${tempC}°C`);
    print(`Condition: ${condition}`);
};

(async () => {
    const apiKey = 'your_api_key';
    const city = 'London';
    const url = `https: 

    try {
        const rawData = await fetchData(url);
        const weatherData = processData(rawData);
        displayWeather(weatherData);
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
    }
})();

 
const target = { weather: 'sunny' };
const handler = {
    get: (obj, prop) => {
        print(`Property '${prop}' has been accessed.`);
        return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
        print(`Property '${prop}' has been set to '${value}'.`);
        return Reflect.set(obj, prop, value);
    }
};

const proxy = new Proxy(target, handler);

print(proxy.weather);  
proxy.weather = 'rainy';  
print(proxy.weather);  
