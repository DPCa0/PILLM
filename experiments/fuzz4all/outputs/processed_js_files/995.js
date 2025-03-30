 

 
function fakeApiCall(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'valid') {
        resolve({ data: 'Successful response data' });
      } else {
        reject(new Error('Invalid endpoint'));
      }
    }, 1000);
  });
}

 
async function* fetchData(endpoints) {
  for (const endpoint of endpoints) {
    try {
      const response = await fakeApiCall(endpoint);
      yield response.data;
    } catch (error) {
      yield error.message;
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);
    if (typeof value === 'function') {
      return (...args) => {
        print(`Calling ${prop} with arguments:`, args);
        return value.apply(target, args);
      };
    }
    return value;
  },
};

const proxiedApiCall = new Proxy(fakeApiCall, handler);

 
(async function run() {
  const endpoints = ['valid', 'invalid', 'valid'];
  const dataGenerator = fetchData(endpoints);

  for await (const data of dataGenerator) {
    print('API call result:', data);
  }
})();
