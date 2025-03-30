 
import { complex } from 'mathjs';

 
async function performComplexOperations() {
   
  const bigNumber = 1234567890123456789012345678901234567890n;

   
  const uniqueValues = new Set(['apple', 'banana', 'apple', 'orange']);

   
  const weakMap = new WeakMap();
  let obj = { key: 'value' };
  weakMap.set(obj, 'associated data');

   
  const calculateSum = (...numbers) => numbers.reduce((sum, num) => sum + num, 0);

   
  const handler = {
    get: (target, property) => {
      return property in target ? target[property] : `Property ${property} not found`;
    }
  };
  
  const proxyObject = new Proxy({ a: 1, b: 2 }, handler);

   
  const complex1 = complex(2, 3);  
  const complex2 = complex(1, 4);  
  const complexSum = complex1.add(complex2);

   
  const fetchResult = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched successfully'), 2000);
  });

  try {
    print(`BigInt: ${bigNumber}`);
    print(`Unique Values: ${[...uniqueValues]}`);
    print(`WeakMap Value: ${weakMap.get(obj)}`);
    print(`Sum: ${calculateSum(10, 20, 30, 40)}`);
    print(`Proxy Object (existing): ${proxyObject.a}`);
    print(`Proxy Object (non-existing): ${proxyObject.z}`);
    print(`Complex Sum: ${complexSum.toString()}`);
    
    const result = await fetchResult;
    print(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

performComplexOperations();
