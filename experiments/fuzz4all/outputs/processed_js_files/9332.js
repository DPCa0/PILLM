 

 
const fetchData = async (url) => {
  print(`Fetching data from ${url}`);
  return new Promise(resolve => setTimeout(() => resolve(`Data from ${url}`), 1000));
};

 
function* asyncGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
async function handleAsyncGenerator(generator) {
  for (let promise of generator) {
    print(await promise);
  }
}

 
const obj = {
  name: 'John Doe',
  age: 30,
  location: 'New York'
};

const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(obj, handler);

 
(async () => {
   
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
   
  await handleAsyncGenerator(asyncGenerator(urls));
  
   
  print(proxy.name);
  proxy.age = 31;
  print(proxy.age);
})();
