 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Alice', age: 25 }), 1000);
  });
}

 
const logger = (fn) => async (...args) => {
  print('Arguments:', ...args);
  const result = await fn(...args);
  print('Result:', result);
  return result;
};

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Getting property '${prop}'`);
      return obj[prop];
    } else {
      print(`Property '${prop}' does not exist`);
      return undefined;
    }
  },
  set: (obj, prop, value) => {
    print(`Setting property '${prop}' to ${value}`);
    obj[prop] = value;
    return true;
  },
};

(async function main() {
   
  const fetchDataWithLogging = logger(fetchData);
  const data = await fetchDataWithLogging();

   
  const person = new Proxy(data, handler);

   
  print(person.name);  
  person.name = 'Bob';       
  print(person.gender);  
})();
