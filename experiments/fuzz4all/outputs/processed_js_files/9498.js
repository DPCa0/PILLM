 
import fs from 'fs';

 
const readFileAsync = (filePath) =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

 
async function processFile(filePath) {
  try {
    const fileContent = await readFileAsync(filePath);
    const parsedData = JSON.parse(fileContent);

     
    const updatedData = {
      ...parsedData,
      timestamp: new Date().toISOString(),
    };

     
    print(`Updated Data: ${JSON.stringify(updatedData, null, 2)}`);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
  }
}

 
const handler = {
  get: (target, property) =>
    property in target ? target[property] : 'Property does not exist',
};

const proxyObject = new Proxy({ key: 'value' }, handler);

print(proxyObject.key);  
print(proxyObject.nonExistentKey);  

 
processFile('data.json');
