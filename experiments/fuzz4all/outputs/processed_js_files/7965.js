 
const EventEmitter = require('events');

 
class MyEmitter extends EventEmitter {
  async emitEvent() {
     
    const data = await this.fetchData();
    this.emit('dataFetched', data);
  }

  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Hello, advanced JavaScript!' });
      }, 1000);
    });
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Property '${prop}' accessed with value:`, target[prop]);
      return target[prop];
    }
    return `Property '${prop}' does not exist on target object.`;
  }
};

const targetObject = { foo: 'bar', number: 42 };
const proxy = new Proxy(targetObject, handler);

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, index) => `${acc}${str}${values[index] ? `[${values[index]}]` : ''}`, '');
}

 
const myMap = new Map();
myMap.set('greeting', 'Hello');
myMap.set('subject', 'World');

 
(function() {
   
  const myEmitter = new MyEmitter();

   
  myEmitter.on('dataFetched', (data) => {
    print(`Event received with data: ${JSON.stringify(data)}`);
  });

   
  myEmitter.emitEvent();

   
  print(proxy.foo);
  print(proxy.number);
  print(proxy.nonExistentProperty);

   
  print(tag`This is a ${myMap.get('greeting')} tagged template with a dynamic ${myMap.get('subject')}.`);
})();
