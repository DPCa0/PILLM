 

 
function delayedValue(value, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

 
async function* fetchData() {
  const values = ['apple', 'banana', 'cherry'];
  for (const value of values) {
    const result = await delayedValue(value, Math.random() * 1000);
    yield result;
  }
}

 
const loggingHandler = {
  get: function(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set: function(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

 
const fruits = new Proxy({}, loggingHandler);

 
async function processData() {
  for await (const fruit of fetchData()) {
    print(`Received: ${fruit}`);
    fruits[fruit] = fruit.length;  
  }

  print('Final fruit lengths:', fruits);  
}

processData();
