 
import { writeFileSync } from 'fs';
import crypto from 'crypto';

 
(async () => {
  try {
     
    const asyncTask = () => new Promise((resolve) => setTimeout(() => resolve('Task Completed'), 1000));

    const taskResult = await asyncTask();
    print(taskResult);  

     
    const user = { name: 'Alice', age: 30 };
    const { name, age } = user;
    print(`User: ${name}, Age: ${age}`);

     
    const numbers = [1, 2, 3];
    const square = (num) => num * num;
    const squaredNumbers = numbers.map((num) => square(num));
    print('Squared Numbers:', ...squaredNumbers);

     
    const duplicateNumbers = [1, 2, 2, 3, 3, 4];
    const uniqueNumbers = Array.from(new Set(duplicateNumbers));
    print('Unique Numbers:', ...uniqueNumbers);

     
    const hash = crypto.createHash('sha256').update('Hello, world!').digest('hex');
    print('SHA-256 Hash:', hash);

     
    writeFileSync('result.txt', `Result: ${taskResult}\nHash: ${hash}`);
    print('File Written Successfully');

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
