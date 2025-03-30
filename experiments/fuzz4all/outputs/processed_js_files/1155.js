 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get(target, property) {
    print(`Property '${property}' has been accessed.`);
    return target[property];
  },
};
const proxyObject = new Proxy(targetObject, handler);

 
const gen = infiniteSequence();
print(gen.next().value);  
print(gen.next().value);  
print(gen.next().value);  

 
print(proxyObject.a);  
print(proxyObject.b);  

 
fetchData('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log('Fetched Data:', data))
  .catch(error => console.error('Fetching error:', error));
