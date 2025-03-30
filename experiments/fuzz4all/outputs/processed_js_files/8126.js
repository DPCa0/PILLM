 
const loggerHandler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed`);
    return obj[prop];
  }
};

 
const data = {
  message: "Hello, advanced JavaScript!",
  count: 0,
  increment() {
    this.count++;
    return this.count;
  }
};

const proxyData = new Proxy(data, loggerHandler);

 
const displayMessage = (msg = "Default Message") => `Displaying: ${msg}`;

 
async function simulateAsyncTask() {
  print("Starting async task...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  print("Async task completed.");
}

 
const mySet = new Set([1, 2, 2, 3]);
const myMap = new Map();

myMap.set('key1', 'value1');
myMap.set('key2', 'value2');

 
const [first, ...rest] = mySet;
print(first, rest);

proxyData.increment();  
print(proxyData.message);  

print(displayMessage(proxyData.message));  

simulateAsyncTask();  
