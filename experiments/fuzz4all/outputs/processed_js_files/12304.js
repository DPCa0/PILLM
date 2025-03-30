 
import { readFile } from 'fs/promises';

 
const readFileProxyHandler = {
  apply: function(target, thisArg, argumentsList) {
    print(`Reading file: ${argumentsList[0]}`);
    return target.apply(thisArg, argumentsList);
  }
};

const readFileWithLogging = new Proxy(readFile, readFileProxyHandler);

 
async function processJsonFile(filePath) {
  try {
    const data = await readFileWithLogging(filePath, 'utf8');
    const jsonData = JSON.parse(data);

     
    const results = await Promise.all(
      Object.entries(jsonData).map(async ([key, value]) => {
        return {
          key,
          processedValue: await processData(value)
        };
      })
    );

    return results;
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

 
function processData(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value * 2);   
    }, 1000);
  });
}

 
(async () => {
  const filePath = './data.json';   
  const processedData = await processJsonFile(filePath);
  print('Processed Data:', processedData);
})();

This program uses advanced JavaScript features such as ES modules, Proxies, Promises, async/await, and object destructuring in a complex and structured manner.