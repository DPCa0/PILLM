 

 
function* randomNumbers(count) {
  while (count--) {
    yield new Promise(resolve => {
      setTimeout(() => resolve(Math.random()), 500);
    });
  }
}

 
async function processRandomNumbers(generator) {
  const numbers = [];
  for await (let number of generator) {
    print(`Generated: ${number.toFixed(2)}`);
    numbers.push(number);
  }
  return numbers;
}

 
const arrayHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist on array`);
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
(async function main() {
  const numbersGenerator = randomNumbers(5);
  let numbers = await processRandomNumbers(numbersGenerator);
  
  const proxiedArray = new Proxy(numbers, arrayHandler);

   
  print(`Numbers length: ${Reflect.get(proxiedArray, 'length')}`);
  Reflect.set(proxiedArray, 1, 0.99);   
  print(`Updated numbers: ${proxiedArray}`);
})();
