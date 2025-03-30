 
import { promises as fs } from 'fs';

 
const readFileAndProcess = async (filePath) => {
  try {
     
    const data = await fs.readFile(filePath, 'utf8');
    
     
    const uniqueLines = [...new Set(data.split('\n'))].filter(line => line.toLowerCase().includes('error'));

     
    const processedLines = uniqueLines.map((line, index) => `${index + 1}: ${line.trim()}`);

     
    print(processedLines.join('\n'));
  } catch (error) {
    console.error('Error reading or processing the file:', error);
  }
};

 
const filePath = process.argv[2] || './log.txt';

 
(async () => {
  await readFileAndProcess(filePath);
})();
