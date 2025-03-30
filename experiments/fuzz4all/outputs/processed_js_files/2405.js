 
const dynamicProp = "status";
const person = {
  name: "Alice",
  age: 30,
  [dynamicProp]: "Active",
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  },
  updateAge(newAge) {
    this.age = newAge;
  }
};

 
const handler = {
  get(target, property) {
    print(`Getting property '${property}'`);
    return property in target ? target[property] : `Property '${property}' does not exist.`;
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const proxiedPerson = new Proxy(person, handler);

 
function* numberSequence(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

const numbers = numberSequence(1, 5);

print(proxiedPerson.greet());  
proxiedPerson.updateAge(31);         
print(proxiedPerson.age);      
print([...numbers]);           

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncFunction() {
  print("Waiting for 2 seconds...");
  await delay(2000);
  print("Done waiting!");
}

asyncFunction();
