 
const { readFile } = require('fs').promises;

 
const handler = {
  get: (obj, prop) => {
    if (prop === 'random') {
      return Math.random();
    }
    return prop in obj ? obj[prop] : `Property ${prop} not found`;
  }
};

 
const complexObject = new Proxy({ hello: 'world' }, handler);

 
async function displayFileContents(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    print(`File Contents:\n${data}`);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
print(complexObject.hello);     
print(complexObject.goodbye);   
print(complexObject.random);    

 
async function performAsyncTasks() {
  await Promise.all([
    displayFileContents('./file1.txt'),
    displayFileContents('./file2.txt')
  ]);
}

performAsyncTasks();
