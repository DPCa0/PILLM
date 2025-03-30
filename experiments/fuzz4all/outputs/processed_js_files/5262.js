 
class SecretiveData {
  #privateField = 'This is secret';

  constructor(data) {
    this.publicData = data;
  }

  #getSecret() {
    return this.#privateField;
  }

  revealSecret() {
    return this.#getSecret();
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
function* generatorExample() {
  yield* [1, 2, 3];
}

const iterableObj = {
  [Symbol.iterator]: generatorExample
};

 
const complexFunction = ({ a, b }, ...rest) => {
  const [first, ...remaining] = rest;
  return { sum: a + b, first, remaining };
};

 
const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : 'Property does not exist';
  }
};

const proxyObj = new Proxy({ key: 'value' }, handler);

 
(async () => {
  const secretiveData = new SecretiveData('Open Information');
  print(secretiveData.revealSecret());

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched data:', data);

  for (let number of iterableObj) {
    print('Generated number:', number);
  }

  const complexResult = complexFunction({ a: 10, b: 5 }, 'extra', 'data', 'to', 'process');
  print('Complex function result:', complexResult);

  print('Access existing key:', proxyObj.key);
  print('Access non-existing key:', proxyObj.nonExistentKey);
})();
