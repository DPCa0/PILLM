 

 
function* randomNumberGenerator() {
  while (true) {
    yield Math.floor(Math.random() * 100);
  }
}

 
async function delayedOperation() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

 
async function consumeGenerator(gen) {
  for (let i = 0; i < 5; i++) {
    await delayedOperation();
    print(gen.next().value);
  }
}

 
const numberValidator = {
  set: (obj, prop, value) => {
    if (typeof value !== 'number' || value < 0 || value > 100) {
      throw new Error(`Invalid value: ${value}`);
    }
    obj[prop] = value;
    return true;
  },
};

 
const secureNumbers = new Proxy({}, numberValidator);

 
try {
  secureNumbers.test = 50;  
  secureNumbers.test = 150;  
} catch (err) {
  console.error(err.message);
}

 
const gen = randomNumberGenerator();
consumeGenerator(gen);
