 

class WeatherStation {
  constructor(location) {
    this.location = location;
  }

   
  async fetchWeatherData() {
    const simulateAPICall = () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              location: this.location,
              temperature: Math.floor(Math.random() * 35) + 5,  
              condition: ["Sunny", "Cloudy", "Rainy", "Stormy"][
                Math.floor(Math.random() * 4)
              ],
            }),
          1000
        )
      );

    const weatherData = await simulateAPICall();
    return weatherData;
  }
}

const getWeatherUpdates = async (stations) => {
  const fetchPromises = stations.map((station) => station.fetchWeatherData());
  const results = await Promise.all(fetchPromises);

  return results.map(({ location, temperature, condition }) => {
    const weatherSummary = `In ${location}, it is currently ${temperature}°C and ${condition}.`;
    return weatherSummary;
  });
};

 
(async () => {
  const stations = [
    new WeatherStation("New York"),
    new WeatherStation("Los Angeles"),
    new WeatherStation("Chicago"),
  ];

  const weatherUpdates = await getWeatherUpdates(stations);
  weatherUpdates.forEach((update) => print(update));
})();
