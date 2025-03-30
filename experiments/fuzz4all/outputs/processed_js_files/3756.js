 
import fs from 'fs';
import { promisify } from 'util';

 
const readFileAsync = promisify(fs.readFile);

 
async function readJson(filePath) {
  try {
    const data = await readFileAsync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
}

 
const handler = {
  get: function(target, property, receiver) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property, receiver);
  }
};

const dataProxy = new Proxy({ name: "JavaScript", type: "Programming Language" }, handler);

 
(async () => {
  print(`Data Proxy: Name - ${dataProxy.name}, Type - ${dataProxy.type}`);
  
   
  const { name, type } = dataProxy;
  print(`The ${name} is a ${type}.`);

   
  if (name === "JavaScript") {
    const { default: chalk } = await import('chalk');
    print(chalk.green('JavaScript module loaded dynamically!'));
  }
  
   
  const jsonData = await readJson('./data.json');
  if (jsonData) {
    print('JSON Data:', jsonData);
  }
})();
