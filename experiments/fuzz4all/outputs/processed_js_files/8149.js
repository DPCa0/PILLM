 
async function fetchData(url) {
   
  let response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const person = new Proxy({ name: 'Alice', age: 30 }, {
  get: (target, prop) => {
    print(`Property '${prop}' accessed.`);
    return target[prop];
  }
});

 
function* idGenerator() {
  let id = 0;
  while (true) yield id++;
}

 
const idGen = idGenerator();
for (const id of idGen) {
  print(`Generated ID: ${id}`);
  if (id > 3) break;  
}

 
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  }
}

const counter = createCounter();
print(counter());  
print(counter());  

 
const [first, ...rest] = [10, 20, 30, 40, 50];
print(first);  
print(rest);   

 
(async () => {
  try {
    let data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print(`Fetched data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
