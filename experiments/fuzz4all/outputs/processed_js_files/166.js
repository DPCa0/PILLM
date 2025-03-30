 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function* asyncNumberGenerator(max) {
  for (let i = 1; i <= max; i++) {
    await sleep(1000);  
    yield i;
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    } else {
      print(`Property '${prop}' not found, returning default value`);
      return 42;
    }
  }
};

const numbers = new Proxy({}, handler);

(async () => {
  const maxNumber = 5;
  const generator = asyncNumberGenerator(maxNumber);

  for await (const number of generator) {
    numbers[`number${number}`] = number;
    print(numbers[`number${number}`]);  
    print(numbers[`nonExistentProperty`]);  
  }
})();
