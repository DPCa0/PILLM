 
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const observedObject = new Proxy({}, handler);

 
function tag(strings, ...expressions) {
  return strings.reduce((acc, str, i) => `${acc}${str}${expressions[i] ? expressions[i].toUpperCase() : ''}`, '');
}

const name = "world";
print(tag`Hello, ${name}!`);

 
const memoizedFetchData = memoize(fetchData);

(async () => {
  try {
    const data = await memoizedFetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(data);
  } catch (error) {
    console.error(error);
  }

  observedObject.a = 10;
  observedObject.b = 20;
})();
