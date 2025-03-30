 
import { promises as fs } from 'fs';

 
async function processTextFile() {
  try {
     
    const data = await fs.readFile('./input.txt', 'utf-8');

     
    const transformedData = data
      .split('\n')
      .filter(line => line.trim() !== '')  
      .map(line => line.toUpperCase())  
      .reduce((acc, line) => `${acc}${line}\n`, '');  

     
    await fs.writeFile('./output.txt', transformedData);

     
    print(`File processed successfully! ${new Date().toLocaleString()}`);
  } catch (error) {
     
    console.error(`Error processing file: ${error.message}`);
  }
}

 
processTextFile();

 
const handler = {
  get: (target, property) => {
    return property in target ? target[property] : `Property "${property}" does not exist`;
  }
};

const proxyObject = new Proxy({ existingProperty: 'I am here' }, handler);

 
print(proxyObject.existingProperty);  
print(proxyObject.nonExistentProperty);  
