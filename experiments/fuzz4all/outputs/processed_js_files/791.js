 

 
import { promises as fs } from 'fs';

 
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

 
const createDynamicObject = (initialData) => {
  return new Proxy(initialData, {
    get(target, property) {
      return property in target ? target[property] : `Property ${property} is not defined`;
    },
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  });
};

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const main = async () => {
  const generator = numberGenerator();
  const config = createDynamicObject(await readJsonFile('config.json'));
  
  print('Initial config:', config);
  
   
  config.newSetting = 'This is a new setting';
  print('Updated config:', config);

  print('Number from generator:', generator.next().value);
  print('Number from generator:', generator.next().value);
};

 
main().catch(console.error);
