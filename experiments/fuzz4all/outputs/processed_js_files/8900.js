 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

 
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

 
function createReactiveObject(obj, callback) {
  return new Proxy(obj, {
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      callback(target, key, value);
      return result;
    }
  });
}

 
const data = createReactiveObject({ count: 0 }, (target, key, value) => {
  print(`Property ${key} set to ${value}`);
});

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const processArray = memoize((arr) => {
  return arr.filter((x) => x % 2 === 0).map((x) => x * 2);
});

 
async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const post = await fetchData(url);
    print('Fetched post:', post);

    data.count = 1;

    const ids = idGenerator();
    print('Generated ID:', ids.next().value);

    const result = processArray([1, 2, 3, 4, 5, 6]);
    print('Processed array:', result);

  } catch (error) {
    console.error('Error:', error);
  }
}

 
main();
