 

 
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      yield data;
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const obj = { name: 'Advanced JavaScript' };
const proxiedObj = new Proxy(obj, handler);

 
async function processUrls(urls) {
  const generator = fetchData(urls);
  for await (const data of generator) {
    print('Received data:', data);
    proxiedObj.lastFetched = Date.now();
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

 
processUrls(urls);

 
print('Name:', proxiedObj.name);
proxiedObj.newProp = 'Hello Proxy!';
