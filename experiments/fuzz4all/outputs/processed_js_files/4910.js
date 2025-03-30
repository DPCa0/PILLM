class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  
  toString() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model);
    this.year = year;
  }
  
  toString() {
    return `${this.year} ${super.toString()}`;
  }
}

const car = new Car('Tesla', 'Model S', 2023);

function* logVehicleInformation(vehicle) {
  yield `Vehicle Information: ${vehicle.toString()}`;
}

(async function() {
  const vehicleIterator = logVehicleInformation(car);
  for await (let info of vehicleIterator) {
    print(info);
  }

  const dynamicImport = await import('https://cdn.skypack.dev/lodash');
  const numbers = [1, 2, 3, 4, 5];
  const doubled = dynamicImport.default.map(numbers, n => n * 2);
  
  print('Doubled Numbers:', doubled);

  const newVehicle = {...car, color: 'red'};
  print('New Vehicle:', newVehicle);
})();
