 
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(arr) {
  for (const item of arr) {
    await sleep(100);
    yield item;
  }
}

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      return Reflect.set(target, prop, value);
    } else {
      throw new Error('Only numeric values are allowed');
    }
  }
};

const proxiedObject = new Proxy({ number: 42 }, handler);

async function processData() {
  const data = ['a', 'b', 'c', 1, 2, 3];
  const results = [];

  try {
    for await (const item of asyncGenerator(data)) {
      if (typeof item === 'string') {
        proxiedObject.stringProperty = item;   
      } else {
        proxiedObject.number = item;
      }
      results.push(proxiedObject.number || proxiedObject.stringProperty);
    }
  } catch (error) {
    console.error(error.message);
  }

  return results;
}

processData().then(results => print('Processed results:', results));
