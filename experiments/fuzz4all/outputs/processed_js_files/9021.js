 

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(...arguments);
  }
};

const person = {
  name: 'Alice',
  age: 30
};

const proxyPerson = new Proxy(person, handler);

 
async function fetchData() {
  const response = await new Promise((resolve) => 
    setTimeout(() => resolve({ data: 'Async data fetched' }), 1000)
  );
  print(response.data);
}

 
function* counterGen() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

 
const counter = counterGen();

 
async function main() {
  print(proxyPerson.name);  

  await fetchData();  

  print('Counter values:');
  print(counter.next().value);  
  print(counter.next().value);  
  print(counter.next().value);  
}

main();
