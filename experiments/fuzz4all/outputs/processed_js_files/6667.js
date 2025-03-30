 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url === 'https://api.example.com/data') {
      resolve({ data: [1, 2, 3, 4, 5] });
    } else {
      reject('404 Not Found');
    }
  }, 1000);
});

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
async function fetchAndProcessData(url) {
  try {
    const response = await fetchData(url);
    const dataGen = dataGenerator(response.data);
    for (let item of dataGen) {
      print(`Processed: ${item * 2}`);  
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'processData') {
      return function(url) {
        print(`Intercepted call to process data from: ${url}`);
        return Reflect.apply(target[prop], target, [url]);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const apiHandler = {
  fetchAndProcessData
};

const proxiedAPI = new Proxy(apiHandler, handler);

 
proxiedAPI.fetchAndProcessData('https://api.example.com/data');
