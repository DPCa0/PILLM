 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { id: 1, value: 'Hello, Proxy!' } });
    }, 1000);
  });
};

 
function* generatorExample() {
  yield 'Yielded Value 1';
  yield 'Yielded Value 2';
  return 'Finished Yielding';
}

 
async function processData() {
  const generator = generatorExample();

  for (let value of generator) {
    print(value);
  }

  const data = await fetchData();
  print(`Fetched Data: ${JSON.stringify(data)}`);

  return data.data;
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}" with value: "${target[prop]}"`);
      return target[prop];
    } else {
      return `Property "${prop}" does not exist`;
    }
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  },
};

 
(async () => {
  const data = await processData();

  const proxyData = new Proxy(data, handler);

  print(proxyData.value);   
  proxyData.newProp = 'A new property!';   
  print(proxyData.nonExistent);   
})();
