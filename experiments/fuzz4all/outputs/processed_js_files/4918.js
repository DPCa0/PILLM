 
const fs = require('fs');
const { promisify } = require('util');

 
const readFileAsync = promisify(fs.readFile);

 
async function* processJsonFile(filePath) {
  try {
     
    const content = await readFileAsync(filePath, 'utf-8');
    
     
    const jsonData = JSON.parse(content);
    
     
    for (const [key, value] of Object.entries(jsonData)) {
      yield { key, value };
    }
  } catch (error) {
    console.error('Error reading or processing the file:', error);
  }
}

 
(async () => {
  const filePath = 'data.json';  
  const generator = processJsonFile(filePath);

   
  for await (const { key, value } of generator) {
    print(`Key: ${key}, Value: ${JSON.stringify(value)}`);
  }
})();
