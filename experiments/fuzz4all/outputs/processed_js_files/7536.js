 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }
    return `Property ${property} doesn't exist`;
  },
};

const dynamicObject = new Proxy({}, handler);

// Utilizing Symbol for unique property keys
const uniqueKey = Symbol('uniqueKey');
dynamicObject[uniqueKey] = 'This is a unique value';

// Generator function to yield API URLs
function* apiURLGenerator() {
  yield 'https: 
  yield 'https://api.example.com/endpoint2';
  yield 'https://api.example.com/endpoint3';
}

 
(async () => {
  const urls = apiURLGenerator();
  for (let url of urls) {
    const response = await fetchData(url);
    print(response.data);
  }

  print(dynamicObject.existingProperty);
  print(dynamicObject.nonExistentProperty);
  print(dynamicObject[uniqueKey]);

   
  const { a, ...rest } = { a: 1, b: 2, c: 3 };
  print(a);  
  print(rest);  
})();

 
const dataStore = new Map();
const uniqueValues = new Set([1, 2, 3, 2, 1]);
uniqueValues.forEach((value) => dataStore.set(value, `Value is ${value}`));

print([...dataStore.values()]);
