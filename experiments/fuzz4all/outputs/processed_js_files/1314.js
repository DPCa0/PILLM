 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncIterator = {
  async *[Symbol.asyncIterator]() {
    for (let i = 0; i < 3; i++) {
      await delay(1000);  
      yield i;
    }
  }
};

const handler = {
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
    }
    console.warn(`Property ${prop} doesn't exist`);
    return 42;  
  }
};

async function fetchAndLogData() {
  const data = { x: 10, y: 20 };
  const proxyData = new Proxy(data, handler);

  for await (const value of asyncIterator) {
    const { x, y } = proxyData;
    print(`Iteration: ${value}, x: ${x}, y: ${y}, z: ${proxyData.z}`);
  }
}

fetchAndLogData();
