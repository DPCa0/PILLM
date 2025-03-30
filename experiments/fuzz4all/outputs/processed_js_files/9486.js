 

const fetchData = url => new Promise(resolve => {
  setTimeout(() => {
    resolve({ data: `Data from ${url}` });
  }, 1000);
});

async function* asyncGenerator(urls) {
  for (const url of urls) {
    const response = await fetchData(url);
    yield response.data;
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} not found, returning 'N/A'`);
      return 'N/A';
    }
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataStore = new Proxy({}, handler);

(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const generator = asyncGenerator(urls);

  for await (const data of generator) {
    print(`Fetched: ${data}`);
  }

  dataStore.firstName = 'John';
  print(dataStore.firstName);  
  print(dataStore.lastName);   
})();
