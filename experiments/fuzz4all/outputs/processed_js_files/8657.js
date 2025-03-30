 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function asyncLogger(messages) {
  for (const message of messages) {
    await delay(1000);
    print(`Logged after 1 second delay: ${message}`);
  }
}

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
const arrayHandler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
async function run() {
   
  const numbers = new Proxy([], arrayHandler);

   
  const generator = numberGenerator();
  for (let i = 0; i < 5; i++) {
    numbers.push(generator.next().value);
  }

   
  await asyncLogger(numbers);
}

run();
