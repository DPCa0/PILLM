 
import fs from 'fs/promises';

 
(async function advancedFeaturesDemo() {
   
  const _privateData = new WeakMap();

  class Secret {
    constructor(secret) {
       
      _privateData.set(this, secret);
    }
    
    reveal() {
      return _privateData.get(this);
    }
  }

   
  const handler = {
    get: (target, prop, receiver) => {
      if (prop === 'magicNumber') {
        return 42;  
      }
      return Reflect.get(target, prop, receiver);
    }
  };

  const targetObject = { value: 10 };
  const proxyObject = new Proxy(targetObject, handler);

  print('Magic Number:', proxyObject.magicNumber);  

   
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    print('File Content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }

   
  const promise1 = Promise.resolve('Promise 1 Resolved');
  const promise2 = Promise.reject('Promise 2 Rejected');
  const promise3 = Promise.resolve('Promise 3 Resolved');

  const results = await Promise.allSettled([promise1, promise2, promise3]);
  results.forEach((result, index) => {
    print(`Promise ${index + 1}:`, result.status);
    if (result.status === 'fulfilled') {
      print('Value:', result.value);
    } else {
      print('Reason:', result.reason);
    }
  });

   
  function tag(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
  }
  
  const name = 'World';
  print(tag`Hello, ${name}!`);  

   
  const mySecret = new Secret('Hidden Message');
  console.log('Reve