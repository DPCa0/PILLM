class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }

  static fromFahrenheit(fahrenheit) {
    return new Temperature((fahrenheit - 32) * 5 / 9);
  }

  *generateForecast() {
    for (let day = 1; day <= 5; day++) {
      yield `${this.#celsius + Math.round(Math.random() * 10 - 5)} °C`;
    }
  }

  async printForecast() {
    for await (const forecast of this.generateForecast()) {
      print(forecast);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

(async () => {
  const temp = Temperature.fromFahrenheit(86);
  print(`Temperature in Celsius: ${temp.#celsius}°C`);  
  print(`Temperature in Fahrenheit: ${temp.fahrenheit}°F`);

  print('5-Day Temperature Forecast:');
  await temp.printForecast();
})();
