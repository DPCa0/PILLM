 

 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

 
const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(...arguments);
  },
};

let person = { name: "John", age: 30 };
let proxyPerson = new Proxy(person, handler);

proxyPerson.name;  
proxyPerson.age = 31;  

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let num of fibonacci(10)) {
  print(num);
}

 
let fruitSet = new Set(["apple", "banana", "mango"]);
fruitSet.add("orange");
fruitSet.delete("banana");

let fruitMap = new Map();
fruitMap.set("apple", { color: "red" });
fruitMap.set("banana", { color: "yellow" });

 
let { apple, banana, ...restFruits } = Object.fromEntries(fruitMap);
print(apple, restFruits);

 
class Vehicle {
  static totalVehicles = 0;
  #name;

  constructor(name) {
    this.#name = name;
    Vehicle.totalVehicles++;
  }

  static getTotalVehicles() {
    return Vehicle.totalVehicles;
  }

  getName() {
    return this.#name;
  }
}

let car = new Vehicle("Car");
let bike = new Vehicle("Bike");

print(Vehicle.getTotalVehicles());
print(car.getName());
