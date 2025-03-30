class Vehicle {
  #type;
  constructor(type, wheels) {
    this.#type = type;
    this.wheels = wheels;
  }
  static compare(vehicle1, vehicle2) {
    return vehicle1.wheels === vehicle2.wheels;
  }
  toString() {
    return `This vehicle is a ${this.#type} with ${this.wheels} wheels.`;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super('Car', 4);
    this.brand = brand;
    this.model = model;
  }
  get fullName() {
    return `${this.brand} ${this.model}`;
  }
}

async function getVehicleData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ type: 'Bike', wheels: 2 }), 1000);
  });
}

const init = async () => {
  const bikeData = await getVehicleData();
  const bike = new Vehicle(bikeData.type, bikeData.wheels);
  const myCar = new Car('Tesla', 'Model S');

  print(myCar.toString());
  print(bike.toString());
  print(`Are they comparable? ${Vehicle.compare(myCar, bike)}`);

  const types = ['bicycle', 'tricycle', 'quadricycle'];
  const [first, second, ...rest] = types;
  print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);
};

init();
