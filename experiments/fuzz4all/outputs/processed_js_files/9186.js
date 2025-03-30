 

async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    yield await Promise.resolve(i++);
  }
}

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    return `Property "${prop}" not found`;
  }
};

const obj = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(obj, handler);

async function processAsyncGenerator() {
  for await (let value of asyncGenerator()) {
    print(`AsyncGenerator Value: ${value}`);
  }
}

function* numberGenerator() {
  yield* [4, 5, 6];
}

function processNumberGenerator() {
  const numbers = [...numberGenerator()];
  print(`NumberGenerator Values: ${numbers.join(', ')}`);
}

print(`Proxy Access: ${proxy.a}, ${proxy.d}`);
processNumberGenerator();
processAsyncGenerator();
