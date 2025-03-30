 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
  yield delay(1000).then(() => 'First value');
  yield delay(1000).then(() => 'Second value');
  yield delay(1000).then(() => 'Third value');
}

 
async function processAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    print(value);
  }
}

 
const target = {
  message1: "Hello",
  message2: "World"
};

 
const handler = {
  get: function(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property "${prop}" not found`;
    }
  }
};

 
const proxy = new Proxy(target, handler);

 
function demonstrateProxy() {
  print(proxy.message1);  
  print(proxy.message2);  
  print(proxy.message3);  
}

 
(async () => {
  print('Processing async generator...');
  await processAsyncGenerator();
  
  print('Demonstrating proxy...');
  demonstrateProxy();
})();
