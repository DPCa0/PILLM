 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* generateSequence() {
  for (let i = 1; i <= 5; i++) {
    await delay(1000);
    yield i;
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const targetObject = { a: 1, b: 2, c: 3 };
const proxiedObject = new Proxy(targetObject, handler);

 
async function run() {
  for await (let value of generateSequence()) {
    print(`Generated value: ${value}`);
    proxiedObject[`prop${value}`] = value * 10;
    print(`Proxied property: prop${value} = ${proxiedObject[`prop${value}`]}`);
  }
}

run();
