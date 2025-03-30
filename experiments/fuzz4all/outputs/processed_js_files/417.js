 
import { promises as fsPromises } from 'fs';
import EventEmitter from 'events';

 
class MyEmitter extends EventEmitter {}

 
async function readAndEmit(filePath) {
  const myEmitter = new MyEmitter();

   
  myEmitter.on('readComplete', (data) => {
    print('Data read from file:', data);
  });

   
  myEmitter.on('error', (err) => {
    console.error('An error occurred:', err.message);
  });

  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    myEmitter.emit('readComplete', parsedData);
  } catch (error) {
    myEmitter.emit('error', error);
  }
}

 
(async () => {
  const filePath = './data.json';

   
  const { conditionMet } = await import('./config.js');
  if (conditionMet) {
    print('Condition met, proceeding to read the file.');
    await readAndEmit(filePath);
  } else {
    print('Condition not met, exiting.');
  }
})();
Note: This code assumes the existence of `data.json` and `config.js` files in the same directory. The `data.json` should contain JSON data and `config.js` should export a `conditionMet` boolean.