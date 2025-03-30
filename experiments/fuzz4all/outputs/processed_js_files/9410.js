 

class AsyncGeneratorHandler {
  constructor(generatorFn) {
    this.generatorFn = generatorFn;
  }

  async handle(input) {
    const generator = this.generatorFn(input);
    let result = generator.next();

    while (!result.done) {
      const promise = Promise.resolve(result.value);
      result = generator.next(await promise);
    }
    return result.value;
  }
}

const asyncGeneratorExample = new AsyncGeneratorHandler(function* (url) {
  const response = yield fetch(url);
  const data = yield response.json();
  return data;
});

const apiProxy = new Proxy(asyncGeneratorExample, {
  get: (target, prop, receiver) => {
    return function (...args) {
      if (prop === 'handle') {
        print(`Fetching data from: ${args[0]}`);
      }
      return Reflect.get(target, prop, receiver).apply(target, args);
    };
  },
});

async function run() {
  try {
    const data = await apiProxy.handle('https://jsonplaceholder.typicode.com/todos/1');
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

run();
