 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const { name, version } = { name: 'AdvancedJSApp', version: '1.0' };
    
     
    const appInfo = {
      name,
      version,
      details: () => `${name} v${version} is running with advanced JS features.`
    };

    print(appInfo.details());

     
    const uniqueData = new Set([1, 2, 3, 3, 4, 5]);
    
     
    for (const num of uniqueData) {
      print(`Number: ${num}`);
    }

     
    await fs.writeFile('appInfo.txt', appInfo.details());
    print('App details written to file.');

     
    const cache = new WeakMap();
    const keyObj = {};
    cache.set(keyObj, 'cachedValue');

    print(`Cache has keyObj: ${cache.has(keyObj)}`);

     
    const handler = {
      get: (target, property) => (property in target ? target[property] : 'Not Found')
    };

    const proxyObj = new Proxy({ existingProp: 'I exist' }, handler);
    print(proxyObj.existingProp);  
    print(proxyObj.nonExistingProp);  

  } catch (error) {
    console.error('Error:', error);
  }
})();
