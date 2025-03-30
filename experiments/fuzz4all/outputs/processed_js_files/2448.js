 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* dataStream(interval) {
  let i = 0;
  while (true) {
    await delay(interval);
    yield i++;
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);

(async () => {
  const stream = dataStream(1000);  
  obj.name = "Advanced JS Example";

  for await (let num of stream) {
    if (num > 5) break;  
    print(`Number from stream: ${num}`);
    print(obj.name);
  }

  print(obj.nonExistentProperty);  
})();
