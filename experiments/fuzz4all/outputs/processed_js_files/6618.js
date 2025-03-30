 
async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property ${prop} was accessed`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    print(`Property ${prop} was set to ${value}`);
    return Reflect.set(...arguments);
  }
};

const originalObject = { name: 'JavaScript', version: 'ES2023' };
const proxiedObject = new Proxy(originalObject, handler);

 
Reflect.set(proxiedObject, 'version', 'ES2024');
print(Reflect.get(proxiedObject, 'name'));

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Data fetched:', data);

     
    const title = data?.title ?? 'No title found';
    print('Post title:', title);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 
const uniqueValues = new Set([1, 2, 3, 4, 4, 5]);
print('Unique Values from Set:', [...uniqueValues]);

const valueMap = new Map();
valueMap.set('key1', 'value1');
valueMap.set('key2', 'value2');
print('Value from Map for key1:', valueMap.get('key1'));

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}${values[i] || ''}`, '');
}

const name = 'Developer';
print(tag`Hello, ${name}. Welcome to the world of ES2023 features!`);
