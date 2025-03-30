 
const uniqueKey = Symbol('unique');

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      print(`Getting property: ${prop.toString()}`);
      return obj[prop];
    },
    set(obj, prop, value) {
      print(`Setting property: ${prop.toString()} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* numberStream() {
  let num = 1;
  while (true) {
    await delay(1000);
    yield num++;
  }
}

 
(async () => {
  const data = {
    [uniqueKey]: 'Secret',
    name: 'JavaScript',
    version: 'ES2023'
  };

   
  const proxyData = createLoggingProxy(data);

   
  const { name, ...rest } = proxyData;
  print(`Name: ${name}, Other Data: ${JSON.stringify(rest)}`);

   
  const updatedData = { ...proxyData, version: 'ESNext' };

   
  const numberIterator = numberStream();
  print('Streaming numbers:');
  for await (const num of numberIterator) {
    print(num);
    if (num >= 5) break;  
  }

   
  print(`Unique Key: ${updatedData?.[uniqueKey] ?? 'Not Available'}`);
})();
