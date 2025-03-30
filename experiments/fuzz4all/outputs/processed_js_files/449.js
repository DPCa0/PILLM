 

 
function* dataGenerator() {
  const data = [10, 20, 30, 40, 50];
  for (const item of data) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(item), Math.random() * 1000)
    );
  }
}

 
const arrayHandler = {
  get: (target, prop) => {
    if (prop === 'sum') {
      return target.reduce((acc, val) => acc + val, 0);
    }
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
async function processData() {
  const dataArray = [];
  const proxyArray = new Proxy(dataArray, arrayHandler);

  const generator = dataGenerator();
  for await (const dataPromise of generator) {
    const data = await dataPromise;
    proxyArray.push(data);
    print(`Current Array: [${proxyArray.join(', ')}], Sum: ${proxyArray.sum}`);
  }
}

 
(async () => {
  await processData();
  const [first, second, ...rest] = [1, 2, 3, 4, 5];
  print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);
})();
