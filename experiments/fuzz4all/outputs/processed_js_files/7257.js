 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get: function (target, prop) {
    print(`Getting ${prop}`);
    return prop in target ? target[prop] : 42;
  },
  set: function (target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const targetObject = {};
const proxy = new Proxy(targetObject, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
const privateData = new WeakMap();

class SecretHolder {
  constructor(secret) {
    privateData.set(this, secret);
  }

  reveal() {
    return privateData.get(this);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await fetchData(url);
  print('Fetched Data:', data);

  proxy.name = 'Alice';
  print('Name:', proxy.name);
  print('Unknown:', proxy.unknown);

  print('Generated ID:', idGen.next().value);
  print('Generated ID:', idGen.next().value);

  const secretInstance = new SecretHolder('mySecret');
  print('Revealed Secret:', secretInstance.reveal());
})();
