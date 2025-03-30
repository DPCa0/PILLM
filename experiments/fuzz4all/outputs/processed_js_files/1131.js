class Weather {
  constructor() {
    this.conditions = ['Sunny', 'Rainy', 'Cloudy', 'Windy', 'Snowy'];
  }

  get randomCondition() {
    return this.conditions[Math.floor(Math.random() * this.conditions.length)];
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.conditions[index++ % this.conditions.length],
        done: false
      })
    };
  }
}

const forecast = async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  for await (const condition of new Weather()) {
    print(`The weather is: ${condition}`);
    await delay(1000);
  }
};

(async () => {
  print('Weather forecast starting...');
  forecast();
  const fetchData = async () => {
    const data = await Promise.resolve({ temperature: 22, humidity: 45 });
    const { temperature, humidity } = data;
    print(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);
  };
  fetchData();
})();
