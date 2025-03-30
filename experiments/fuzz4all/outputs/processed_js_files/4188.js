 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, 2000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' has been accessed`);
    return target[property];
  }
};

const targetObject = {
  apiEndpoint: 'https://api.example.com/data',
  token: '123abc'
};

const proxyObject = new Proxy(targetObject, handler);

(async () => {
  try {
    print('Starting complex operation...');

     
    const { apiEndpoint = 'https://default.api', ...rest } = proxyObject;

     
    const response = await fetchData(apiEndpoint?.toLowerCase());

    print(response);
    print('Additional info:', rest);

     
    const dataMap = new Map([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);

    dataMap[Symbol.iterator] = function* () {
      for (let [key, value] of [...this.entries()].reverse()) {
        yield [key, value];
      }
    };

    for (let [key, value] of dataMap) {
      print(`Map entry: ${key} => ${value}`);
    }

     
    print(`Completed operation at ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
