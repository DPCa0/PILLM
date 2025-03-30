 

const dataHandler = {
  data: { count: 0 },

  async increment(step = 1) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.count += step;
        resolve(this.data.count);
      }, 1000);
    });
  },

  async getCount() {
    return this.data.count;
  }
};

const handler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    if (property === Symbol.iterator) {
      let index = 0;
      return function* () {
        while (index < target.data.count) {
          yield index++;
        }
      };
    }
    throw new Error(`Property ${property} not found.`);
  }
};

const proxyHandler = new Proxy(dataHandler, handler);

async function run() {
  print('Initial count:', await proxyHandler.getCount());
  await proxyHandler.increment(5);
  print('Updated count:', await proxyHandler.getCount());

  for (const val of proxyHandler) {
    print(`Iterating: ${val}`);
  }
}

run();
