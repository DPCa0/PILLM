 
import { readFile } from 'fs/promises';

 
(async () => {
  try {
     
    const data = JSON.parse(await readFile(new URL('./data.json', import.meta.url), 'utf8'));
    
     
    const { name = 'Unknown', age = 0, skills = [] } = data;

     
    const skillsList = skills.map(skill => `- ${skill}`).join('\n');

     
    function highlight(strings, ...values) {
      return strings.reduce((acc, str, i) => `${acc}<strong>${values[i - 1]}</strong>${str}`);
    }
    
    print(highlight`Name: ${name}, Age: ${age}`);
    print(`Skills:\n${skillsList}`);

     
    const handler = {
      get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} not found`),
    };
    
    const personProxy = new Proxy(data, handler);
    print(personProxy.name);  
    print(personProxy.nonExistentProp);  

     
    const secretKey = Symbol('secret');
    personProxy[secretKey] = '42';

    print(`Secret: ${personProxy[secretKey]}`);
  } catch (err) {
    console.error('Error:', err);
  }
})();
