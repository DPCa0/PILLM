 

 
const FETCH_DATA = Symbol('fetchData');

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    if (prop === FETCH_DATA) {
      return async () => {
        const data = await fetchData();
        return [...dataGenerator(data)];
      };
    }
    return Reflect.get(target, prop);
  }
};

 
const dataFetcher = new Proxy({}, handler);

(async () => {
  try {
     
    const fruits = await dataFetcher[FETCH_DATA]();
    print('Fetched fruits:', fruits);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
