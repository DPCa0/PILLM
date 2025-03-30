 
import { promises as fs } from 'fs';

 
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
};

 
const dynamicImport = async (moduleName) => {
  try {
    const module = await import(`./modules/${moduleName}.js`);
    module.default();
  } catch (error) {
    console.error('Error importing module:', error);
  }
};

 
const person = new Proxy(
  { name: 'Alice', age: 30 },
  {
    get(target, prop) {
      print(`Getting property ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting property ${prop} to ${value}`);
      target[prop] = value;
      return true;
    },
  }
);

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
const promises = [
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8'),
  fs.readFile('file3.txt', 'utf8'),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) =>
    result.status === 'fulfilled'
      ? console.log('Fulfilled:', result.value)
      : console.error('Rejected:', result.reason)
  );
});

 
const user = {
  name: 'John Doe',
  profile: { email: null },
};

const email = user.profile?.email ?? 'No email provided';
print(email);  

 
(async () => {
  const jsonData = await readJsonFile('data.json');
  console.log('