 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'orange', 'mango']), 1000);
  });
}

 
function* charGenerator(str) {
  for (const char of str) {
    yield char;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const fruitPrices = new Proxy({ apple: 1, banana: 2, orange: 3, mango: 4 }, handler);

 
const Electric = (Base) => class extends Base {
  charge() {
    print('Charging...');
  }
};

 
class Vehicle {
  drive() {
    print('Driving...');
  }
}

class ElectricCar extends Electric(Vehicle) {
  drive() {
    super.drive();
    print('Silently...');
  }
}

 
async function processFruits() {
  const fruits = await fetchData();
  const electricCar = new ElectricCar();

  print('Fruits:', fruits);
  electricCar.charge();
  electricCar.drive();

  for (const fruit of fruits) {
    const price = fruitPrices[fruit];
    print(`Price of ${fruit}: $${price}`);

    print(`Characters in ${fruit}:`);
    const charGen = charGenerator(fruit);
    for (const char of charGen) {
      print(char);
    }
  }
}

processFruits();
