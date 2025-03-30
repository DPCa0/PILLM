class WeatherService {
  constructor(location) {
    this.location = location;
  }

  async fetchWeather() {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();
    return data;
  }
}

function* temperatureAlert(temperature) {
  while (true) {
    if (temperature > 30) {
      yield 'Warning: High temperature!';
    } else if (temperature < 0) {
      yield 'Warning: Low temperature!';
    } else {
      yield 'Temperature is normal.';
    }
    temperature = yield;
  }
}

(async () => {
  try {
    const service = new WeatherService('New York');
    const data = await service.fetchWeather();
    const { temp_c } = data.current;

    const alertGenerator = temperatureAlert(temp_c);
    print(alertGenerator.next().value);   
    print(alertGenerator.next(temp_c).value);   

     
    print(alertGenerator.next(35).value);
    print(alertGenerator.next(-5).value);

  } catch (error) {
    console.error('Error:', error);
  }
})();
