 

 
export const asyncMultiply = async (a, b) => {
  const result = await new Promise((resolve) => setTimeout(() => resolve(a * b), 1000));
  return result;
};

 
import { asyncMultiply } from './mathUtil.js';

 
async function calculate(...numbers) {
  if (numbers.length < 2) {
    throw new Error("At least two numbers are required.");
  }
  let [first, second, ...rest] = numbers;
  let product = await asyncMultiply(first, second);
  for (let num of rest) {
    product = await asyncMultiply(product, num);
  }
  return product;
}

 
(async () => {
  try {
    const values = [3, 4, 5, 2];
    print(`Calculating product of: ${values}`);
    const result = await calculate(...values);
    print(`The product is: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
