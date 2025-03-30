 

function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const ids = idGenerator();

class AsyncOperation {
  constructor(data) {
    this.data = data;
  }

  async execute() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.toUpperCase());
      }, 1000);
    });
  }
}

const operationHandler = {
  get(target, prop, receiver) {
    if (prop === 'execute') {
      print('Executing async operation with data:', target.data);
    }
    return Reflect.get(...arguments);
  },
};

async function main() {
  const operation1 = new Proxy(new AsyncOperation('first'), operationHandler);
  const operation2 = new Proxy(new AsyncOperation('second'), operationHandler);

  const results = await Promise.all([operation1.execute(), operation2.execute()]);

  for (const result of results) {
    print(`Operation result: ${result}, ID: ${ids.next().value}`);
  }
}

main().catch(console.error);
