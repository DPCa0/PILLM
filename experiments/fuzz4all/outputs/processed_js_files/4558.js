 
import { readFile } from 'fs/promises';
import { EventEmitter } from 'events';

 
const emitter = new EventEmitter();

 
const asyncOperation = (value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value > 5) resolve(`Resolved with value: ${value}`);
      else reject(`Rejected with value: ${value}`);
    }, 1000);
  });

 
const handleAsyncOperation = async () => {
  try {
    const result1 = await asyncOperation(10);
    print(result1);

    const data = await readFile('./somefile.txt', 'utf8');  
    print(`File content: ${data}`);

    const result2 = await asyncOperation(2);  
    print(result2);
  } catch (error) {
    console.error(`Caught an error: ${error}`);
  } finally {
    print('Execution completed.');
    emitter.emit('operationComplete');  
  }
};

 
emitter.on('operationComplete', () => {
  print('The asynchronous operations are complete.');
});

 
(async () => {
  print('Starting complex asynchronous operations...');
  await handleAsyncOperation();
})();
