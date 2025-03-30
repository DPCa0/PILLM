 
import * as fs from 'fs/promises';

 
const complexOperation = async () => {
  try {
     
    const { fileName = 'example.txt', content = 'Hello, Advanced JavaScript!' } = { fileName: 'data.txt' };

     
    await fs.writeFile(fileName, `Data: ${[...content].join(' ')}`);

     
    const data = await fs.readFile(fileName, 'utf-8');

     
    const printOutput = output => print(`Read content: ${output}`);
    printOutput(data);
  } catch ({ message }) {
     
    console.error(`An error occurred: ${message}`);
  }
};

 
Promise.all([complexOperation(), complexOperation()])
  .then(() => console.log('Operations completed'))
  .catch(({ message }) => console.error(`Failed operations: ${message}`));
