 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number' && value > 0) {
      print(`Setting property ${prop} to ${value}`);
      target[prop] = value;
      return true;
    } else {
      throw new Error(`Invalid value for ${prop}`);
    }
  }
};

 
const target = { age: 25 };

 
const proxy = new Proxy(target, handler);

 
async function* fetchData() {
  const urls = ['https://api.github.com', 'https://jsonplaceholder.typicode.com/posts'];
  for (const url of urls) {
    const response = await fetch(url);
    yield response.json();
  }
}

 
(async () => {
  try {
    print(await (await fetch('https://api.github.com')).json());

    proxy.age = 30;  
    print(proxy.age);  

     
    for await (const data of fetchData()) {
      print('Fetched data:', data);
    }
  } catch (err) {
    console.error(err.message);
  }
})();
