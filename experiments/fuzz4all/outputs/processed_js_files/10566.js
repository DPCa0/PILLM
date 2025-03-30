 

 
function* asyncGenerator() {
  yield fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json());
  yield new Promise(resolve => setTimeout(() => resolve('Async operation completed after 2s'), 2000));
  yield 'Final value';
}

 
async function runAsyncGenerator(gen) {
  const generator = gen();
  for await (const value of generator) {
    print(value);
  }
}

 
const targetObject = { a: 1, b: 2 };
const proxyHandler = {
  get: (target, prop, receiver) => {
    print(`Getting ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxyObject = new Proxy(targetObject, proxyHandler);

 
(async () => {
   
  await runAsyncGenerator(asyncGenerator);

   
  print(proxyObject.a);    
  proxyObject.b = 42;            
  print(proxyObject.b);    
})();
