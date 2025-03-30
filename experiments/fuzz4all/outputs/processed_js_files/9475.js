 

 
function* fetchDataGenerator() {
  yield 'Fetching user data...';
  yield new Promise((resolve) => setTimeout(() => resolve('User data fetched'), 1000));
  yield 'Fetching order data...';
  yield new Promise((resolve) => setTimeout(() => resolve('Order data fetched'), 1000));
  yield 'All data fetched!';
}

 
async function consumeGenerator(generator) {
  let result;
  do {
    result = generator.next();
    if (result.value instanceof Promise) {
      print(await result.value);
    } else {
      print(result.value);
    }
  } while (!result.done);
}

 
const targetObject = { user: 'John Doe', age: 30 };

const proxyHandler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const proxyObject = new Proxy(targetObject, proxyHandler);

 
proxyObject.user;  
proxyObject.age = 31;  

 
consumeGenerator(fetchDataGenerator());
