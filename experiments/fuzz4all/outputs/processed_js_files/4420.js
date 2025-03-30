 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const data = await fs.readFile('input.txt', 'utf8');
    
     
    const processedData = data
      .split('\n')
      .map((line, index) => `${index + 1}: ${line.toUpperCase()}`)
      .join('\n');
    
     
    const [outputFile = 'output.txt'] = process.argv.slice(2);
    
     
    await fs.writeFile(outputFile, processedData);
    print(`Processed data saved to ${outputFile}`);
  } catch (error) {
     
    console.error('Error:', error?.message ?? 'Unknown error');
  }
})();

 
const handler = {
  get(target, prop) {
     
    return prop in target ? target[prop] : `Property ${prop} not found`;
  }
};

const obj = new Proxy({ greeting: 'Hello, world!' }, handler);
print(obj.greeting);      
print(obj.farewell);      
