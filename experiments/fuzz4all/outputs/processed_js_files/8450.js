 
const fetchData = async (url) => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject('Network Error');
      }
    }, 1000);
  });
  return response.data;
};

 
const getData = async (url) => {
  try {
    const data = await fetchData(url);
    print(`Received: ${data}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generator = idGenerator();

 
const resultsMap = new Map();

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];

 
urls.forEach(async (url) => {
  const id = generator.next().value;
  await getData(url);
  resultsMap.set(id, `Result for ${url}`);
});

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property ${prop}`);
    return Reflect.get(target, prop);
  },
};

const proxiedResultsMap = new Proxy(resultsMap, handler);

 
setTimeout(() => {
  print(proxiedResultsMap.get(1));
  print(proxiedResultsMap.get(2));
  print(proxiedResultsMap.get(3));
}, 3000);
