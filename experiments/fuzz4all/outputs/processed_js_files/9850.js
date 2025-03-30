 

 
const handler = {
  get: function(target, prop) {
    print(`Property '${prop}' was accessed.`);
    return target[prop];
  }
};

const targetObject = {
  a: 1,
  b: 2,
  c: 3
};

const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched!'), 1000);
  });
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
async function complexFunction() {
  print("Start complex function");

   
  const value = proxy.a;
  print(`Accessed proxy value: ${value}`);

   
  const data = await fetchData();
  print(data);

   
  const generator = idGenerator();
  print("Generated IDs: ");
  print(generator.next().value);
  print(generator.next().value);
  print(generator.next().value);
}

 
complexFunction();
