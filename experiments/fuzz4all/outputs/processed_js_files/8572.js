 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const [fileData, randomValue] = await Promise.all([
      fs.readFile('example.txt', 'utf-8'),
      (async () => Math.random())()  
    ]);

     
    const parsedData = JSON.parse(fileData)?.importantData ?? 'No data';

     
    const result = `Random Value: ${randomValue.toFixed(2)}, Parsed Data: ${parsedData}`;

     
    const resultsArray = [...new Set(result.split(' '))];
    
     
    const resultsMap = new Map(resultsArray.map((item, index) => [index, item]));

     
    for (const [key, value] of resultsMap) {
      print(`Key: ${key}, Value: ${value}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
