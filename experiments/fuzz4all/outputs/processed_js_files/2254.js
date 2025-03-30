 
async function* fetchWithCache(url) {
  const cache = new Map();
  if (cache.has(url)) {
    yield cache.get(url);
  } else {
    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    yield data;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' was accessed`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const targetObj = { a: 1, b: 2 };
const proxiedObj = new Proxy(targetObj, handler);

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => 
    `${acc}${str}<span class="highlight">${values[i] || ''}</span>`, '');
}

const name = 'JavaScript';
print(highlight`Learning ${name} features is fun!`);

 
(async () => {
  const dataGenerator = fetchWithCache('https://jsonplaceholder.typicode.com/posts/1');
  for await (const data of dataGenerator) {
    print(data);
  }

  print(proxiedObj.a);  
  proxiedObj.b = 3;  
})();
