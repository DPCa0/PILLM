 
async function* fetchData(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
    } else {
      print(`Property "${prop}" not found.`);
      return 42;  
    }
  }
};

const data = { a: 1, b: 2 };
const proxyData = new Proxy(data, handler);

 
const sym = Symbol('uniqueKey');
const map = new Map();
map.set(sym, { nested: 'value' });

 
(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1'];
  const [response] = await Promise.all([...fetchData(urls)]);
  
  response.then(data => {
    print('Fetched Data:', data);

     
    const { nested } = map.get(sym);
    print('Symbol Map Value:', nested);

     
    print('Proxy Data:', proxyData.a, proxyData.b, proxyData.c);
  });
})();
