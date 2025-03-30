 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
};

 
function* promiseGenerator() {
  yield fetchData();
  yield fetchData();
  yield fetchData();
}

 
async function processPromises(generator) {
  const iterator = generator();
  for (let promise of iterator) {
    print(await promise);
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

const data = { message: "Hello Proxy!" };
const proxy = new Proxy(data, handler);

 
proxy.message;            
proxy.message = "New!";   

 
processPromises(promiseGenerator);
