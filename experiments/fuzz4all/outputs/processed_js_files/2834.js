 

 
function* numberGenerator(limit) {
  for (let i = 0; i <= limit; i++) {
    yield i;
  }
}

 
async function processNumbers(generator, limit) {
  let sum = 0;
  for (let num of generator(limit)) {
    sum += await new Promise((resolve) => setTimeout(() => resolve(num), 100));
  }
  return sum;
}

 
const sumHandler = {
  get: (target, property) => {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to ${value}`);
    target[property] = value;
    return true;
  },
};

 
(async () => {
  const limit = 10;
  const sumContainer = { sum: 0 };
  const proxySumContainer = new Proxy(sumContainer, sumHandler);

   
  proxySumContainer.sum = await processNumbers(numberGenerator, limit);
  print(`The sum of numbers from 0 to ${limit} is: ${proxySumContainer.sum}`);
})();
