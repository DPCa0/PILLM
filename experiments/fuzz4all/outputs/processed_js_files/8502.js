const fetchWeather = async (city) => {
  const apiKey = 'YOUR_API_KEY';
  const endpoint = `https: 

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const { main: { temp }, weather } = data;
    return {
      temperature: (temp - 273.15).toFixed(2),  
      description: weather[0].description,
    };
  } catch (error) {
    console.error('Fetching weather data failed:', error);
  }
};

const cities = ['London', 'Paris', 'New York'];
const weatherPromises = cities.map(city => fetchWeather(city));

Promise.all(weatherPromises)
  .then(weatherDataArray => {
    weatherDataArray.forEach((weatherData, index) => {
      if (weatherData) {
        print(`Weather in ${cities[index]}: ${weatherData.temperature}°C, ${weatherData.description}`);
      } else {
        print(`Failed to retrieve weather data for ${cities[index]}`);
      }
    });
  });

 
const targetObject = { name: 'Alice', age: 25 };
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      print(`Property ${property} does not exist`);
      return 'N/A';
    }
  },
  set: (target, property, value) => {
    if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
      print('Invalid age value');
      return false;
    }
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);
print(proxy.name);   
print(proxy.height);  
proxy.age = 30;             
proxy.age = -5;             
