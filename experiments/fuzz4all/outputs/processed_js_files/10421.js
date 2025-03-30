 
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

 
const handler = {
  get: function (target, prop, receiver) {
    const originalMethod = target[prop];
    if (typeof originalMethod === 'function') {
      return function (...args) {
        print(`Method called: ${prop}, Arguments: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
class DataProcessor {
  process(data) {
    return data.map(item => item.value).reduce((a, b) => a + b, 0);
  }
}

 
const processorProxy = new Proxy(new DataProcessor(), handler);

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const dataGen = fetchData(urls);

  for await (const data of dataGen) {
    const result = processorProxy.process(data);
    print(`Processed Result: ${result}`);
  }
})();
