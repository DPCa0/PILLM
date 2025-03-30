 
import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

 
const fetchDataAndProcess = async (url) => {
  try {
    const response = await fetch(url);  
    const data = await response.json();  

     
    const userMap = new Map();
    const uniqueNames = new Set();

    data.forEach(user => {
      userMap.set(user.id, user);
      uniqueNames.add(user.name);
    });

     
    function* idGenerator() {
      let id = 1;
      while (true) {
        yield id++;
      }
    }

    const gen = idGenerator();
     
    const [firstUser, secondUser, ...restUsers] = data;

     
    print(`First user: ${firstUser.name}, Second user: ${secondUser.name}`);
    print(`Unique User Names: ${[...uniqueNames].join(', ')}`);

     
    const startTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, 1000));  
    const endTime = performance.now();
    print(`Async operation took ${endTime - startTime} milliseconds`);

     
    const handler = {
      get(target, prop, receiver) {
        print(`Getting ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
      }
    };

    const proxiedUser = new Proxy(firstUser, handler);
    proxiedUser.name = 'Updated Name';  
    print(proxiedUser.name);  

  } catch (error) {
    console.error('Error:', error);  
  }
};

 
fetchDataAndProcess('https://jsonplaceholder.typicode.com/users');
