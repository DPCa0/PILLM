 
async function* fetchData() {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

  for (const url of urls) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield { url, data: `Fetched data from ${url}` };
  }
}

 
const transform = fn => data => {
  print(`Transforming data from ${data.url}`);
  return fn(data);
};

 
async function processData() {
  const transformations = [
    transform(data => ({ ...data, data: data.data.toUpperCase() })),
    transform(data => ({ ...data, length: data.data.length })),
  ];

  for await (const data of fetchData()) {
    const result = transformations.reduce((acc, fn) => fn(acc), data);
    print(result);
  }
}

 
const config = {
  apiKey: '12345-ABCDE',
  maxRequests: 10
};

const handler = {
  get(target, property) {
    print(`Accessing config property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting config property: ${property} = ${value}`);
    if (property === 'apiKey' && value.length < 10) {
      throw new Error('API Key must be at least 10 characters long.');
    }
    target[property] = value;
    return true;
  }
};

const configProxy = new Proxy(config, handler);

(async () => {
  try {
    configProxy.apiKey = '67890-XYZ';  
  } catch (e) {
    console.error(e.message);
  }

  print(configProxy.apiKey);  

  await processData();  
})();
