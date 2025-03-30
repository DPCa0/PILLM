class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  
   
  get fahrenheit() {
    return this.celsius * 9/5 + 32;
  }
  
   
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
  
  static fromKelvin(kelvin) {
    return new Temperature(kelvin - 273.15);
  }
}

function delay(ms) {
   
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateTemperatureChange() {
  const temp = Temperature.fromKelvin(300);
  
  print(`Initial: ${temp.celsius.toFixed(2)}°C`);
  
   
  function* changeTemperature() {
    for (let i = 0; i < 5; i++) {
      yield temp.fahrenheit += 10;
    }
  }
  
   
  const [...fahrenheits] = changeTemperature();
  
  for (const fahrenheit of fahrenheits) {
    await delay(1000);   
    print(`Temperature: ${fahrenheit.toFixed(2)}°F (${temp.celsius.toFixed(2)}°C)`);
  }
}

simulateTemperatureChange();
