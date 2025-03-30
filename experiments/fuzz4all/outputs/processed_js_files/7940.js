 
import { promises as fs } from 'fs';

 
async function readJSONFile(filePath) {
  try {
     
    const data = await fs.readFile(filePath, 'utf-8');
     
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error reading or parsing file:', error);
  }
}

 
function* generateNumbers() {
  yield* [1, 2, 3, 4, 5];
}

 
const targetObject = { x: 10, y: 20 };
const handler = {
  get: function (obj, prop) {
    print(`Property '${prop}' accessed.`);
    return prop in obj ? obj[prop] : 0;
  },
};
const proxy = new Proxy(targetObject, handler);

 
const map = new Map([
  ['name', 'JavaScript'],
  ['type', 'Programming Language'],
]);

map.forEach((value, key) => {
  print(`${key}: ${value}`);
});

 
function format(strings, ...values) {
  return strings.reduce((prev, current, i) => {
    return `${prev}${current}<${values[i] || ''}>`;
  }, '');
}

const lang = 'JavaScript';
print(format`Learning ${lang} can be fun and rewarding!`);

 
(function () {
  const numbers = [...generateNumbers()];
  print('Generated Numbers:', numbers);
})();

 
readJSONFile('./example.json').then((data) => {
  print('Parsed JSON Data:', data);
});

 
print('Proxy x:', proxy.x);
print('Proxy z:', proxy.z);  
