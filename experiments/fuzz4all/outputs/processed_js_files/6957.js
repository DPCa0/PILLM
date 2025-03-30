 

async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    yield await response.json();
  }
}

const dataHandler = {
  get: function (target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return Reflect.get(...arguments);
    } else {
      print(`Property "${prop}" not found! Returning default value.`);
      return "Default";
    }
  },
  set: function (target, prop, value) {
    if (typeof value === 'string') {
      print(`Setting property "${prop}" to "${value}"`);
      return Reflect.set(...arguments);
    } else {
      print(`Invalid value type for "${prop}". Expected a string.`);
      return false;
    }
  }
};

const dataObject = new Proxy({}, dataHandler);

async function processData(urls) {
  const dataGenerator = fetchData(urls);
  for await (const data of dataGenerator) {
    Object.entries(data).forEach(([key, value]) => {
      dataObject[key] = typeof value === 'string' ? value : String(value);
    });
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

processData(urls);
