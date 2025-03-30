 
import { promises as fs } from 'fs';

 
async function readAndProcessFile(filePath) {
  try {
     
    const data = await fs.readFile(filePath, 'utf8');
    
     
    const processedData = data
      .split('\n')
      .filter(line => line.trim() !== '')   
      .map((line, index) => `${index + 1}: ${line.trim().toUpperCase()}`)   
      .join('\n');
    
    print(processedData);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

 
const processFiles = async (...filePaths) => {
  for (const path of filePaths) {
    await readAndProcessFile(path);
  }
};

 
processFiles(...['file1.txt', 'file2.txt']);
