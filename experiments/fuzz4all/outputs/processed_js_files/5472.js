 

 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
async function processNumbers(generator) {
  for (let i = 0; i < 5; i++) {
    print(`Processing number: ${generator.next().value}`);
    await sleep(1000);   
  }
}

 
const targetObject = {
  greeting: 'Hello',
  target: 'World'
};

const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.greeting);
proxy.target = 'JavaScript Enthusiast';

 
processNumbers(numberGenerator()).then(() => {
  print(`${proxy.greeting}, ${proxy.target}!`);
});
