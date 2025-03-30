 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

 
const handler = {
  get(target, property) {
    print(`Property '${property}' has been accessed.`);
    return Reflect.get(target, property);
  },
};

const targetObject = { name: 'Alice', age: 30 };
const proxyObject = new Proxy(targetObject, handler);

 
const uniqueKey = Symbol('uniqueKey');
proxyObject[uniqueKey] = 'Secret Data';

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const numbers = numberGenerator();

 
(async function main() {
   
  print(proxyObject.name);  
  print(proxyObject.age);   

   
  const apiData = await fetchData('https://api.github.com');
  print(apiData);

   
  print(numbers.next().value);  
  print(numbers.next().value);  
  print(numbers.next().value);  
})();
