 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* dataStreamer() {
  const data = ['Hello', 'world', 'from', 'a', 'streaming', 'data', 'source'];
  for (const word of data) {
    await delay(500);
    yield word.toUpperCase();
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const targetObj = { message: 'Initial Message' };
const proxyObj = new Proxy(targetObj, handler);

 
(async () => {
  proxyObj.message = 'Starting the data stream';

  for await (const word of dataStreamer()) {
    print(word);
    if (word === 'WORLD') proxyObj.message = 'Updated after WORLD';
  }

  print('Data streaming completed.');
})();
