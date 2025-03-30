 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting the property "${prop}": ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" not found!`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {
  message: 'Hello, world!'
};

 
const proxy = new Proxy(targetObject, handler);

 
print(proxy.message);   
proxy.message = 'Hello, Proxy!';  
print(proxy.message);

 
async function fetchMessage() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(1000);  
  return proxy.message;  
}

 
(async () => {
  const message = await fetchMessage();
  print(`Fetched message: ${message}`);
})();

 
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((num) => num ** 2);
const sumOfSquares = squaredNumbers.reduce((acc, val) => acc + val, 0);

print(`Squared Numbers: ${squaredNumbers}`);
print(`Sum of Squares: ${sumOfSquares}`);

 
const [first, second, ...rest] = squaredNumbers;
print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
