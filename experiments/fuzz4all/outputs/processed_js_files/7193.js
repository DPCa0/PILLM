 

 
export const mathUtils = {
  async addAsync(a, b) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, 1000);
    });
  },

  async multiplyAsync(a, b) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a * b);
      }, 1000);
    });
  },
};

 
import { mathUtils } from './mathUtils.js';

const main = async () => {
  const [a, b] = [5, 10];

  try {
    const sum = await mathUtils.addAsync(a, b);
    print(`Sum of ${a} and ${b} is: ${sum}`);

    const product = await mathUtils.multiplyAsync(a, b);
    print(`Product of ${a} and ${b} is: ${product}`);

    const { max } = await import('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js');
    print(`Max of ${a} and ${b} is: ${max([a, b])}`);

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();
