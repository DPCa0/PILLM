 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const handler = {
  get(target, prop) {
    print(`Getting value of ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting value of ${prop} to ${value}`);
    if (typeof value === 'number') {
      return Reflect.set(target, prop, value);
    } else {
      throw new TypeError('Only numbers are allowed');
    }
  }
};

 
const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
function* oddNumbers(limit) {
  for (let i = 1; i <= limit; i += 2) {
    yield i;
  }
}

 
const odds = [...oddNumbers(10)];
print('Odd Numbers:', odds);

 
function safelyAccess(obj, prop) {
  return obj?.[prop] ?? 'Property does not exist';
}

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);
    
     
    print(safelyAccess(proxyObject, 'a'));  
    proxyObject.c = 3;  
    print(safelyAccess(proxyObject, 'c'));  
  } catch (error) {
    console.error('Error:', error);
  }
})();
