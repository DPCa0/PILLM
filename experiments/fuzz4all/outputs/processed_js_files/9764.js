 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop}' accessed.`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value, receiver) => {
    print(`Property '${prop}' set to '${value}'.`);
    return Reflect.set(...arguments);
  }
};

 
const targetObject = { message: 'Hello, World!', counter: 0 };
const proxy = new Proxy(targetObject, handler);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

 
(async () => {
   
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  const results = await Promise.allSettled(urls.map(url => fetchData(url)));

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Data from url ${urls[index]}:`, result.value);
    } else {
      print(`Error fetching data from url ${urls[index]}:`, result.reason);
    }
  });

   
  print(proxy.message);   
  proxy.counter = 5;            

   
  print('Generated ID:', ids.next().value);
  print('Generated ID:', ids.next().value);
})();
