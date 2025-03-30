 

 
function* generateNumbers() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: function(target, property) {
    print(`Accessing property ${property}`);
    return target[property];
  }
};

 
const obj = { message: 'Hello, world!' };
const proxy = new Proxy(obj, handler);

 
const operationId = Symbol('operationId');

 
async function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      print(`Fetching data for id: ${id.toString()}`);
      resolve({ id, data: `Data for ${id.toString()}` });
    }, 1000);
  });
}

 
(async () => {
  const iterator = generateNumbers();
  
   
  print(proxy.message);
  
   
  const result = await fetchData(operationId);
  print('Result:', result);

   
  for (let i = 0; i < 3; i++) {
    const { value } = iterator.next();
    const symbol = Symbol(value);
    const data = await fetchData(symbol);
    print(`Data for iteration ${i + 1}:`, data);
  }
})();
