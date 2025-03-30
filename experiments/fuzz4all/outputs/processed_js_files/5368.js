 
import fs from 'fs/promises';

 
async function processFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
     
    const transformed = transform`${data}`;
    print('Processed Content:', transformed);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
function transform(strings, ...values) {
  const upperCaseStrings = strings.map(str => str.toUpperCase());
   
  return upperCaseStrings.reduce((acc, curr, i) => acc + curr + (values[i] ? `[${values[i]}]` : ''), '');
}

 
(async () => {
  const filePath = './example.txt';  
  await processFile(filePath);
})();

 
const originalObj = { name: 'AdvancedJS', year: 2023 };
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Set property: ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

const proxyObj = new Proxy(originalObj, handler);
print(proxyObj.name);  
proxyObj.year = 2024;  
