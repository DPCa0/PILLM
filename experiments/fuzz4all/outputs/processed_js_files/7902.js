 
import { readFile } from 'fs/promises';

 
const logWithTime = message => {
  print(`[${new Date().toISOString()}] ${message}`);
};

 
const processFile = async (filePath) => {
  try {
     
    const data = await readFile(filePath, 'utf8');
    
     
    const lines = data.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim());

     
    logWithTime(`Processed ${nonEmptyLines.length} lines`);
    
     
    const results = await Promise.all(
      nonEmptyLines.map(async line => {
        const { processLine } = await import('./lineProcessor.js');
        return processLine(line);
      })
    );
    
    return results;
  } catch (error) {
    logWithTime(`Error processing file: ${error.message}`);
  }
};

 
const config = { outputPath: null };
logWithTime(`Output path is: ${config?.outputPath ?? '/default/path/'}`);

 
(async () => {
  const results = await processFile('./sample.txt');
  results?.forEach(result => logWithTime(`Processed result: ${result}`));
})();
