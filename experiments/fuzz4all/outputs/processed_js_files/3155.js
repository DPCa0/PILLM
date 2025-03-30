 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function manipulateFile(filePath) {
  try {
    let data = await fs.readFile(filePath, 'utf-8');
    
     
    function* processData() {
      for (let char of data) {
        if (char !== '\n') yield char.toUpperCase();
      }
    }
    
    const processedData = [...processData()].join('');

     
    await delay(1000);

     
    myEmitter.emit('dataProcessed', processedData);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
myEmitter.on('dataProcessed', (data) => {
  print('Processed Data:', data);
   
  const countCharacters = (function() {
    let count = 0;
    return function(str) {
      count += str.length;
      print(`Total Characters Processed: ${count}`);
    }
  })();
  countCharacters(data);
});

 
(async function main() {
  const filePath = './example.txt';
  
   
  print(`Preparing to read from: ${filePath ?? 'default.txt'}`);

   
  await manipulateFile(filePath);
})();
