class Vehicle {
  constructor(type, wheels) {
    this.type = type;
    this.wheels = wheels;
  }

  details() {
    return `Type: ${this.type}, Wheels: ${this.wheels}`;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super('Car', 4);
    this.brand = brand;
    this.model = model;
  }

  details() {
    return `${super.details()}, Brand: ${this.brand}, Model: ${this.model}`;
  }

  static compare(c1, c2) {
    return c1.brand.localeCompare(c2.brand) || c1.model.localeCompare(c2.model);
  }
}

function getCarData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { brand: 'Toyota', model: 'Corolla' },
        { brand: 'Tesla', model: 'Model S' },
        { brand: 'Ford', model: 'Fiesta' },
      ]);
    }, 1000);
  });
}

async function main() {
  try {
    const carsData = await getCarData();
    const cars = carsData.map(data => new Car(data.brand, data.model));

    print('Car Details:');
    cars.forEach(car => print(car.details()));

    print('\nSorted Cars:');
    const sortedCars = cars.sort(Car.compare);
    sortedCars.forEach(car => print(car.details()));
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
}

main();
