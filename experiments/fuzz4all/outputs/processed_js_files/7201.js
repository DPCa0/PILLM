 
async function* fetchData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      yield data;
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error}`);
      yield null;
    }
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return Reflect.get(...arguments);
    }
    return `Property "${prop}" does not exist`;
  }
};

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2'
];

 
(async () => {
  const dataProxy = new Proxy({}, handler);
  for await (const data of fetchData(urls)) {
    if (data) {
       
      Object.assign(dataProxy, data);
      print(dataProxy.someProperty);  
    }
  }
})();
