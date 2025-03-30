 
class Vehicle {
  constructor({ type, brand, model, engine: { horsepower, fuelType }, features }) {
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.engine = { horsepower, fuelType };
    this.features = features;
  }

  displayInfo() {
    print(`Vehicle Type: ${this.type}`);
    print(`Brand: ${this.brand}`);
    print(`Model: ${this.model}`);
    print(`Engine: ${this.engine.horsepower} HP, ${this.engine.fuelType}`);
    print(`Features: ${this.features.join(', ')}`);
  }

  *featureIterator() {
    for (let feature of this.features) {
      yield feature;
    }
  }
}

 
async function fetchVehicleData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: 'Car',
        brand: 'Tesla',
        model: 'Model S',
        engine: { horsepower: 1020, fuelType: 'Electric' },
        features: ['Autopilot', 'Electric', 'GPS', 'Smart Summon']
      });
    }, 1000);
  });
}

(async () => {
  try {
    const vehicleData = await fetchVehicleData();
    const myVehicle = new Vehicle(vehicleData);

    myVehicle.displayInfo();

    print('\nIterating over features using Generator:');
    const featureGen = myVehicle.featureIterator();
    for (let feature of featureGen) {
      print(`Feature: ${feature}`);
    }
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
  }
})();
