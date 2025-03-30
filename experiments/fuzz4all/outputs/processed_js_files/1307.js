 
import { promises as fs } from 'fs';
import { EventEmitter } from 'events';

 
async function fetchData(file) {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
class DataProcessor extends EventEmitter {
  constructor() {
    super();
    this.on('dataReady', this.processData);
  }

  processData(data) {
    const processedData = data.map((item) => ({
      ...item,
      isProcessed: true,
    }));
    print('Processed Data:', processedData);
  }
}

 
function* infiniteNumbers(start = 0) {
  let i = start;
  while (true) {
    yield i++;
  }
}

 
const validationHandler = {
  set: (obj, prop, value) => {
    if (prop === 'age' && (value < 0 || value > 150)) {
      throw new Error('Invalid age');
    }
    obj[prop] = value;
    return true;
  },
};

 
(async () => {
   
  const data = await fetchData('data.json');

   
  const processor = new DataProcessor();
  if (data) {
    processor.emit('dataReady', data);
  }

   
  const numGen = infiniteNumbers();
  print('First five numbers:', [numGen.next().value, numGen.next().value, numGen.next().value, numGen.next().value, numGen.next().value]);

   
  const user = new Proxy({}, validationHandler);
  user.age = 25;
  print('User age:', user.age);

  try {
    user.age = -5;
  } catch (error) {
    console.error(error.message);
  }
})();
