 
const fetchData = (url) => new Promise((resolve) => {
  setTimeout(() => resolve(`Data from ${url}`), 1000);
});

 
async function* dataFetcher(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

 
const createProtectedObject = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (!(prop in target)) {
        console.warn(`Property ${prop} does not exist on target`);
        return undefined;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
};

 
const dataSet = new Set(['apple', 'banana', 'apple', 'orange']);
const dataMap = new Map(dataSet.entries());

 
class Processor {
  #data;

  constructor(data) {
    this.#data = data;
  }

  #processData() {
    return this.#data.map(d => d.toUpperCase());
  }

  getProcessedData() {
    return this.#processData();
  }
}

 
(async () => {
  const urls = ['http://api1.com', 'http://api2.com'];
  
  for await (const data of dataFetcher(urls)) {
    print('Fetched:', data);
  }

  const protectedObj = createProtectedObject({name: 'JavaScript', version: 'ES2023'});
  print('Name:', protectedObj.name);
  print('NonExistent:', protectedObj.nonExistent);

  print('DataSet:', dataSet);
  print('DataMap:', dataMap);

  const processor = new Processor(['apple', 'banana', 'orange']);
  print('Processed Data:', processor.getProcessedData());
})();
