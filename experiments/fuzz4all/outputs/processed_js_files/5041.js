 
import { promises as fs } from 'fs';

 
const complexOperation = async (filePath) => {
  try {
     
    const data = await fs.readFile(filePath, 'utf8');
    
     
    const processedData = data.split('\n').map(line => {
      const [key, ...values] = line.split(' ');
      return { [key]: values.join(' ') };
    });
    
     
    const uniqueKeys = [...new Set(processedData.map(item => Object.keys(item)[0]))];
    
     
    const result = uniqueKeys.reduce((acc, key) => {
      acc[key] = processedData
        .filter(item => Object.keys(item)[0] === key)
        .map(item => Object.values(item)[0])
        .join(', ');
      return acc;
    }, {});
    
     
    const jsonString = JSON.stringify(result, null, 2);
    
     
    await fs.writeFile(`processed_${filePath}`, jsonString);
    print(`Processed data has been saved to processed_${filePath}`);
  } catch (error) {
    console.error(`Error during processing: ${error.message}`);
  }
};

 
 
complexOperation('input.txt');
