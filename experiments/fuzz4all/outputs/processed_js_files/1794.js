 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* numberGenerator(max) {
  for (let i = 0; i < max; i++) {
    await delay(100);  
    yield i;
  }
}

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Getting property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property '${prop}' doesn't exist`;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  }
};

async function main() {
  const generator = numberGenerator(5);
  const obj = { message: 'Hello', count: 0 };
  const proxyObj = new Proxy(obj, handler);

  for await (const num of generator) {
    print(`Generated number: ${num}`);
    proxyObj.count = num;
    print(`Count is now: ${proxyObj.count}`);
  }
}

main();
