 

 
const reactiveHandler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    if (typeof target.__react__ === 'function') {
      target.__react__(property, value);
    }
    return true;
  }
};

function reactive(obj, callback) {
  obj.__react__ = callback;
  return new Proxy(obj, reactiveHandler);
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const uniqueValues = new Set([1, 2, 3, 3, 4, 5]);
const keyValueStore = new Map();
keyValueStore.set('name', 'John Doe').set('age', 30);

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
async function logNumbers() {
  for await (const num of numberGenerator()) {
    print(num);
    if (num >= 5) break;
  }
}

(async () => {
  const reactiveObject = reactive({ count: 0 }, (prop, value) => {
    print(`Reactive: ${prop} changed to ${value}`);
  });

  reactiveObject.count++;
  reactiveObject.count++;

  const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched Data:', apiData);

  print('Unique Values:', [...uniqueValues]);
  print('Key-Value Store:', [...keyValueStore.entries()]);

  print('Generated Numbers:');
  await logNumbers();
})();
