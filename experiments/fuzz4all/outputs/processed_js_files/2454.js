 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
async function readFileContent(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
class CustomEmitter extends EventEmitter {
  constructor() {
    super();
    this.on('data', this.handleData);
  }

  handleData(data) {
    print(`Received data: ${data}`);
  }
}

 
function processData(transform) {
  return async (filePath) => {
    const data = await readFileContent(filePath);
    return transform(data);
  };
}

 
const transformData = (data) => {
  const [firstLine, ...rest] = data.split('\n');
  return `${firstLine.toUpperCase()}\n${rest.join('\n')}`;
};

 
(async () => {
  const emitter = new CustomEmitter();
  
   
  const processFile = processData(transformData);

  const result = await processFile('./example.txt');
  
   
  emitter.emit('data', result);
})();

Note: Ensure you have the appropriate file ('example.txt') and Node.js environment to run this code.