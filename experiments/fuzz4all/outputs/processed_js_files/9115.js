 

 
import { promises as fs } from 'fs';

 
async function readAndProcessJSON(filePath) {
  try {
     
    const data = await fs.readFile(filePath, 'utf-8');

     
    const jsonData = JSON.parse(data);

     
    const uniqueItems = new Set(jsonData.items);

     
    const processedItems = [...uniqueItems].map(item => ({
      ...item,
       
      value: item.value?.toUpperCase() ?? 'UNKNOWN'
    }));

     
    print(`Processed ${processedItems.length} unique items:`, processedItems);
  } catch (error) {
    console.error('Error reading or processing file:', error);
  }
}

 
 
readAndProcessJSON('./data.json');

 
const counter = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
})();

print('Initial count:', counter.getCount());
counter.increment();
counter.increment();
print('Count after increments:', counter.getCount());
counter.decrement();
print('Count after decrement:', counter.getCount());

 
async function performAsyncTasks() {
  const promise1 = new Promise((resolve) => setTimeout(() => resolve('First Task Completed'), 1000));
  const promise2 = new Promise((resolve) => setTimeout(() => resolve('Second Task Completed'), 500));

   
  const results = await Promise.allSettled([promise1, promise2]);

  results.forEach((result, index) => {
    print(`Result of Promise ${index + 1}:`, result);
  });
}

performAsyncTasks();
