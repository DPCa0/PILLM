 
import fs from 'fs/promises';

 
async function readAndProcessFile(filePath) {
  try {
     
    const fileContent = await fs.readFile(filePath, 'utf-8');

     
    const [firstLine, ...otherLines] = fileContent.split('\n');
    const upperCasedLines = otherLines.map(line => line.toUpperCase());

     
    const result = `First Line: ${firstLine}\nProcessed Lines:\n${upperCasedLines.join('\n')}`;
    
    print(result);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property: "${property}", Value: "${target[property]}"`);
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist.`);
      return undefined;
    }
  }
};

const config = { logLevel: 'info', debug: true };
const proxyConfig = new Proxy(config, handler);

 
(async () => {
  if (proxyConfig?.debug) {
    print('Debug mode is enabled.');
  }
  
   
  await readAndProcessFile('./sample.txt');
})();
