 
import { readFileSync } from 'fs/promises';

 
(async () => {
  try {
    const filePath = new URL('./data.json', import.meta.url);
    const data = await readFileSync(filePath, 'utf8');
    
     
    const jsonData = JSON.parse(data);
    
     
    const dataMap = new Map(Object.entries(jsonData));
    const uniqueValues = new Set([...dataMap.values()]);
    const sym = Symbol('unique');

     
    const handler = {
      get: (target, prop) => {
        print(`Accessed property ${String(prop)}`);
        return target[prop];
      }
    };
    
    const proxyMap = new Proxy(dataMap, handler);

     
    print('Original Data:', jsonData);
    print('Map Data:', proxyMap);
    print('Unique Values:', uniqueValues);
    print('Symbol:', sym.toString());

     
    print('Author:', jsonData?.author ?? 'Unknown');

     
    const promise1 = Promise.resolve('First');
    const promise2 = Promise.reject('Error');
    const promise3 = Promise.resolve('Second');

    const results = await Promise.allSettled([promise1, promise2, promise3]);

    results.forEach((result, index) => {
      print(`Promise ${index + 1}:`, result.status, result.value || result.reason);
    });

  } catch (error) {
    console.error('Error reading file:', error);
  }
})();
