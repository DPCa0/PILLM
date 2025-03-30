 
const fs = require('fs').promises;
const crypto = require('crypto');

 
async function processFile(filePath) {
  try {
     
    const data = await fs.readFile(filePath, 'utf8');
    
     
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    
     
    print(`File Content:\n${data}`);
    print(`SHA256 Hash: ${hash}`);
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

 
function uniqueElements(arr) {
  return [...new Set(arr)];
}

 
const sampleArray = [1, 2, 2, 3, 4, 4, 5];

 
const customIterable = {
  *[Symbol.iterator]() {
    let i = 0;
    while (i < 3) {
      yield i++;
    }
  },
};

 
processFile('example.txt');  
print('Unique Elements:', uniqueElements(sampleArray));
print('Iterating Custom Iterable:', [...customIterable]);
