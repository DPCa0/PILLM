 

 
import { complexCalculation } from './mathUtils.js';

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ a: 5, b: 10 });
    }, 1000);
  });
};

 
class DataProcessor {
  static async process() {
     
    const { a, b } = await fetchData();  
    const result = complexCalculation(a, b);  

    print(`The result of complex calculation with a=${a} and b=${b} is ${result}`);
  }
}

 
DataProcessor.process();

And an example `mathUtils.js` module:

export const complexCalculation = (x, y) => {
  return (x * y) + Math.sqrt(x ** y) - Math.sin(x + y);
};
