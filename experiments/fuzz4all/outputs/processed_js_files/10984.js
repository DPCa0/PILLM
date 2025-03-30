 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const data = await fs.readFile('./data.json', 'utf-8');
    const jsonData = JSON.parse(data);

     
    const map = new Map(Object.entries(jsonData));
    const uniqueValues = new Set(Object.values(jsonData));
    const [firstKey, firstValue] = map.entries().next().value;

     
    const handler = {
      get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} not found`),
      set: (target, prop, value) => {
        print(`Setting value ${value} to property ${prop}`);
        target[prop] = value;
        return true;
      },
    };

    const reactiveObj = new Proxy({ firstKey, firstValue }, handler);

     
    print(`First Key: ${reactiveObj.firstKey}, First Value: ${reactiveObj.firstValue}`);
    reactiveObj.newProperty = 'Hello, Proxy!';
    print(reactiveObj.nonExistentProp);

     
    function* numberGenerator() {
      for (let i = 0; i < 3; i++) yield i;
    }
    const numbers = [...numberGenerator()];
    print(`Generated Numbers: ${numbers.join(', ')}`);

     
    const uniqueId = Symbol('id');
    reactiveObj[uniqueId] = 'Symbolic ID';
    print(`Symbolic ID: ${reactiveObj[uniqueId]}`);

     
    const { dynamicFeature } = await import('./dynamicModule.js');
    dynamicFeature();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
