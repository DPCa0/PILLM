 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property '${prop}' not found`);
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting property '${prop}' to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const obj = {
  value: 42,
};

 
const proxiedObj = new Proxy(obj, handler);

 
async function getValueWithDelay(proxyObj, prop, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const value = proxyObj[prop];
        resolve(value);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}

 
function* incrementGenerator(value) {
  while (true) {
    value += yield value;
  }
}

 
function increment(proxyObj, prop, amount) {
  const gen = incrementGenerator(proxyObj[prop]);
  proxyObj[prop] = gen.next().value + amount;
  return gen.next(amount).value;
}

 
async function main() {
  try {
     
    const newValue = increment(proxiedObj, 'value', 5);
    print(`Incremented value: ${newValue}`);

     
    const delayedValue = await getValueWithDelay(proxiedObj, 'value', 1000);
    print(`Value with delay: ${delayedValue}`);

  } catch (error) {
    console.error(error.message);
  }
}

main();
