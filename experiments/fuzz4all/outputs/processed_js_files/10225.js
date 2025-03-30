 
const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Async Data'), 1000));

 
(async () => {
   
  const { a, b = 10, ...rest } = { a: 5, c: 15, d: 20 };
  print(`Destructured values: a=${a}, b=${b}, rest=${JSON.stringify(rest)}`);
  
   
  const mergedObject = { ...rest, a, b };
  print('Merged object:', mergedObject);

   
  print(`Start fetching data at: ${new Date().toLocaleTimeString()}`);

   
  const asyncResult = await asyncOperation();
  print(`Fetched: ${asyncResult}`);

   
  const targetObject = { x: 0 };
  const handler = {
    set: (obj, prop, value) => {
      print(`Property ${prop} set to ${value}`);
      obj[prop] = value;
      return true;
    }
  };
  
  const proxyObject = new Proxy(targetObject, handler);
  proxyObject.x = 42;   

   
  const promise1 = Promise.resolve('First');
  const promise2 = Promise.resolve('Second');
  const promise3 = Promise.resolve('Third');

  const results = await Promise.all([promise1, promise2, promise3]);
  print('Promise results:', results.join(', '));
})();
