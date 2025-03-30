 
const fs = require('fs');
const { promisify } = require('util');

 
const readFileAsync = promisify(fs.readFile);

 
const mapAsync = async (fn, array) => {
  return Promise.all(array.map(fn));
};

 
function* delayGenerator(times) {
  for (let time of times) {
    yield new Promise(resolve => setTimeout(resolve, time));
  }
}

 
const dynamicObject = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (!target[prop]) {
        target[prop] = `Value for ${prop}`;
      }
      return target[prop];
    },
  }
);

(async () => {
   
  const path = './somefile.txt';
  await import('path').then(({ join }) => print(`Joined path: ${join('folder', path)}`));

   
  const results = await mapAsync(async item => `Processed ${item}`, ['a', 'b', 'c']);
  print(results);

   
  const delays = delayGenerator([1000, 2000, 3000]);
  for await (const delay of delays) {
    print('Delay passed');
  }

   
  print(dynamicObject.hello);  
  print(dynamicObject.world);  

   
  try {
    const content = await readFileAsync(path, 'utf8');
    print(`File content: ${content}`);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
})();
