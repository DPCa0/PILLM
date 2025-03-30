 

function* generatorFunction() {
  yield 'Generator has started';
  yield 'Second yield reached';
  return 'Generator has finished';
}

const proxyHandler = {
  get: (target, prop) => {
    if (prop === 'message') {
      return `Intercepted: ${Reflect.get(target, prop)}`;
    }
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    if (prop === 'message') {
      print(`Setting message: ${value}`);
    }
    return Reflect.set(target, prop, value);
  }
};

const targetObject = {
  message: 'Hello, Proxy!',
  [Symbol('description')]: 'This is a symbolic property'
};

const proxy = new Proxy(targetObject, proxyHandler);

async function complexAsyncOperation() {
  print('Starting async operation...');
  const data = await new Promise(resolve => {
    setTimeout(() => resolve('Fetched data from async operation'), 1000);
  });
  print('Async operation completed');
  return data;
}

async function main() {
   
  const gen = generatorFunction();
  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);

   
  print(proxy.message);
  proxy.message = 'Updated Proxy Message';

   
  const result = await complexAsyncOperation();
  print(result);

   
  print(targetObject[Object.getOwnPropertySymbols(targetObject)[0]]);
}

main();
