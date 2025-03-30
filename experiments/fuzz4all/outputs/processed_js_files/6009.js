 
const EventEmitter = require('events');

 
class MyEmitter extends EventEmitter {}

 
const myEmitter = new MyEmitter();

 
const dynamicMethodInvocation = (obj, methodName, ...args) => {
  if (Reflect.has(obj, methodName)) {
    return Reflect.apply(obj[methodName], obj, args);
  }
  throw new Error(`Method ${methodName} not found`);
};

 
const uniqueMethod = Symbol('unique');

 
MyEmitter.prototype[uniqueMethod] = function() {
  print('This is a uniquely invoked method using a symbol!');
};

 
const complexObject = { data: [1, 2, 3, 4, 5] };
const weakRef = new WeakRef(complexObject);

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Fetched data successfully!'), 1000);
  });
};

 
(async () => {
  try {
    const result = await fetchData();
    print(result);

     
    const handler = {
      get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return target[prop];
      }
    };
    const proxyObject = new Proxy(complexObject, handler);

    print(proxyObject.data);

     
    myEmitter.emit('event');
    
     
    dynamicMethodInvocation(MyEmitter.prototype, uniqueMethod);

     
    const derefObject = weakRef.deref();
    if (derefObject) {
      print('Weakly referenced object is still alive:', derefObject.data);
    } else {
      print('The weakly referenced object has been garbage collected');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

 
myEmitter.on('event', () => {
  print('An event occurred!');
});
