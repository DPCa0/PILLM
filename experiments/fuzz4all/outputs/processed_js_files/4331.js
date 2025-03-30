 

 
const EventEmitter = require('events');

 
class MyEmitter extends EventEmitter {}

 
const myEmitter = new MyEmitter();

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' accessed`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {
  name: 'AdvancedJS',
  version: '1.0.0'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
async function performOperations() {
   
  const highlight = (strings, ...values) =>
    strings.reduce((prev, curr, i) => `${prev}${curr}**${values[i] || ''}**`, '');

   
  const data = await fetchData('https://example.com');
  print(data);

   
  print(proxyObject.name);
  proxyObject.version = '2.0.0';

   
  print(highlight`Updated ${proxyObject.name} to version ${proxyObject.version}`);
}

 
myEmitter.on('start', async () => {
  print('Operations started...');
  await performOperations();
  print('Operations finished.');
});

 
myEmitter.emit('start');
