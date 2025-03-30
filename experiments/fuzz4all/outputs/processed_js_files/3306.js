 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return prop in target ? target[prop] : 'Property not found';
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const targetObj = { name: 'JavaScript', version: 'ES2021' };
const proxyObj = new Proxy(targetObj, handler);

 
const uniqueValues = new Set([1, 2, 3, 3, 4]);
const mapValues = new Map([[1, 'one'], [2, 'two']]);

const [a, b, ...rest] = [...uniqueValues];
print(a, b, rest);

for (const [key, value] of mapValues) {
  print(`Key: ${key}, Value: ${value}`);
}

 
proxyObj.name;
proxyObj.newProp = 'Advanced JavaScript';

 
const format = (strings, ...values) => {
  return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '');
};

const user = 'Developer';
const msg = format`Hello, ${user}! Welcome to the ${proxyObj.name} world.`;
print(msg);

 
fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data => {
  if (data) print(data);
});
