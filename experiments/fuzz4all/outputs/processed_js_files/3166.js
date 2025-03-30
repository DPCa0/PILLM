 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

async function asyncNumberHandler(gen, stopAt = 5) {
  const logDelayed = async (number, delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        print(`Logging number: ${number}`);
        resolve(number);
      }, delay);
    });
  };

  let nextNumber = gen.next();
  while (!nextNumber.done && nextNumber.value < stopAt) {
    await logDelayed(nextNumber.value, 1000);
    nextNumber = gen.next();
  }
}

const numbers = numberGenerator();
asyncNumberHandler(numbers);

 
const targetObject = {
  message: "Hello, Proxy!"
};

const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return Reflect.get(obj, prop);
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
};

const proxyObject = new Proxy(targetObject, handler);
print(proxyObject.message);
proxyObject.message = "Hello, world via Proxy!";
print(proxyObject.message);
