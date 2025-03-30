 

 
async function* asyncDataGenerator() {
  const data = ["apple", "banana", "cherry"];
  for (let item of data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item.toUpperCase();
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return Reflect.get(target, prop);
    } else {
      console.error(`Property "${prop}" does not exist`);
      return undefined;
    }
  }
};

 
const fruitProxy = new Proxy({ color: 'red', taste: 'sweet' }, handler);

 
async function processFruits() {
  const fruits = asyncDataGenerator();
  for await (const fruit of fruits) {
    print(`Fruit: ${fruit}, Color: ${fruitProxy.color}`);
  }
}

 
processFruits();

 
print(`The taste of the fruit is: ${fruitProxy.taste}`);
print(`Accessing a non-existing property: ${fruitProxy.season}`);
