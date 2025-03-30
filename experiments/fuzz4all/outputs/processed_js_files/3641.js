 

 
function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === '/success') {
        resolve({ data: 'Fetched Data' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
}

 
async function* asyncDataHandler() {
  try {
    const response = await fetchData('/success');
    yield response.data;
  } catch (error) {
    yield error.message;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${prop} doesn't exist`;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      return Reflect.set(target, prop, value);
    } else {
      throw new TypeError('Property value must be a number');
    }
  }
};

// Target object
const targetObject = { a: 1, b: 2 };

// Creating a Proxy
const proxy = new Proxy(targetObject, handler);

// Using Proxy
print(proxy.a); // 1
print(proxy.c); // "Property c doesn't exist"
proxy.b = 3; // Valid
// proxy.b = '3'; // Uncommenting this will throw a TypeError

// Using the generator
(async () => {
  const dataGenerator = asyncDataHandler();
  for await (const data of dataGenerator) {
    print('Async generator output:', data); // "Fetched Data"
  }
})();
