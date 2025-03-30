 

 
import { promises as fs } from 'fs';

 
(async () => {
   
  const complexObject = {
    name: 'Advanced JS Features',
    data: {
      values: [1, 2, 3, 4, 5],
      calculateAverage() {
        return this.values.reduce((a, b) => a + b, 0) / this.values.length;
      },
    },
    logAverage: function () {
      print(`Average is: ${this.data.calculateAverage()}`);
    },
    async writeToFile(filename, content) {
      try {
        await fs.writeFile(filename, content);
        print(`Content written to ${filename}`);
      } catch (error) {
        console.error('Error writing to file', error);
      }
    },
  };

   
  const { name, logAverage, writeToFile } = complexObject;
  const { values, calculateAverage } = complexObject.data;

   
  const newValues = [...values, 6, 7, 8];

   
  const proxyHandler = {
    get(target, prop) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    },
  };

  const proxyObject = new Proxy(complexObject, proxyHandler);

   
  proxyObject.logAverage();
  proxyObject.writeToFile(
    'output.txt',
    `Original Values: ${values}\nNew Values: ${newValues}\nCalculated Average: ${calculateAverage()}`
  );

   
  const delayedLog = (message, delay) =>
    new Promise((resolve) => setTimeout(() => resolve(print(message)), delay));

   
  await delayedLog(`Hello from ${name}`, 1000);
})();
