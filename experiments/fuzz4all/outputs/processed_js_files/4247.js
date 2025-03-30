 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(num++), 1000));
  }
}

 
const logHandler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
let obj = new Proxy({}, logHandler);

 
async function processNumbers() {
  const gen = numberGenerator();
  for (let i = 0; i < 5; i++) {
    obj.currentNumber = await gen.next().value;
    print(`Current number: ${obj.currentNumber}`);
  }
}

 
processNumbers();
