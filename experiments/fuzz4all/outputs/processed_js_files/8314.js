 
import fs from 'fs/promises';

 
const simulateNetworkRequest = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.2 ? resolve('Data fetched successfully!') : reject(new Error('Failed to fetch data'));
  }, 1000);
});

 
const main = async () => {
  try {
    print('Starting data fetch...');

     
    const result = await simulateNetworkRequest();

     
    const modulePath = result.includes('success') ? './moduleSuccess.js' : './moduleFailure.js';
    const dynamicModule = await import(modulePath);

    print(`Result: ${result}`);
    print(`Message from module: ${dynamicModule.message}`);

     
    const data = await fs.readFile('example.txt', 'utf-8');
    print('File Data:', data);

     
    const promises = [Promise.resolve('First'), Promise.reject('Second'), Promise.resolve('Third')];
    const settledResults = await Promise.allSettled(promises);

    print('Promises results:', settledResults);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

 
main();
