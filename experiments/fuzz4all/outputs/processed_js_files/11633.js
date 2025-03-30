 

 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield new Promise((resolve) => setTimeout(() => resolve(number++), 1000));
  }
}

 
async function fetchNumbers(generator) {
  for await (const numPromise of generator()) {
    const num = await numPromise;
    print(`Generated number: ${num}`);
    if (num >= 5) break;  
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return property in target ? target[property] : undefined;
  },
};

 
const targetObject = {
  a: 1,
  b: 2,
};

 
const proxyObject = new Proxy(targetObject, handler);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
fetchNumbers(numberGenerator);
print(proxyObject.a);  
print(proxyObject.c);  
fetchData('https://jsonplaceholder.typicode.com/posts/1');  
