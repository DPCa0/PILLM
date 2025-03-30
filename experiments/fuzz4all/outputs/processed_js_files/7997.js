 
const fs = require('fs').promises;
const os = require('os');
const { performance } = require('perf_hooks');

 
(async () => {
   
  const privateData = new WeakMap();
  
  class ComplexObject {
    constructor(name, value) {
      privateData.set(this, { name, value });
    }
    
    getName() {
      return privateData.get(this).name;
    }
    
    getValue() {
      return privateData.get(this).value;
    }
  }

   
  const objects = Array.from({ length: 5 }, (_, i) => new ComplexObject(`Object${i}`, Math.random()));

   
  const results = await Promise.all(objects.map(async obj => {
     
    const { name, value } = { name: obj.getName(), value: obj.getValue() };
    
     
    function logResult(strings, ...values) {
      return strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
    }
    
    const formattedOutput = logResult`Processed ${name} with value: ${value.toFixed(2)}`;
    
     
    await fs.writeFile(`./${name}.txt`, formattedOutput);
    return formattedOutput;
  }));
  
   
  print(...results);

   
  const userInfo = {
    name: 'Alice',
    details: {
      age: 30,
      location: {
        city: 'Wonderland',
        country: 'Magic'
      }
    }
  };

  print(`User lives in: ${userInfo.details?.location?.city || 'unknown city'}`);

   
  const start = performance.now();

   
  for (let i = 0; i < 1e6; i++) {
    Math.sqrt(i);
  }

  const end = performance.now();
  print(`Execution time: ${(end - start).toFixed(2)}ms`);

   
  console.log(`