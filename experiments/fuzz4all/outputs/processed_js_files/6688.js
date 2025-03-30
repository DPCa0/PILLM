 
import { readFile } from 'fs/promises';

 
function* idGenerator(start = 0) {
  let id = start;
  while (true) yield id++;
}

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const data = { key1: 'value1', key2: 'value2' };
const proxiedData = new Proxy(data, handler);

 
async function fetchData() {
  const data = await readFile('./data.json', 'utf8');
  return JSON.parse(data);
}

(async () => {
  try {
    const fileData = await fetchData();
    print('File Data:', fileData);

     
    const { a = 1, b = 2 } = fileData;

     
    const template = (strings, ...keys) => (values) => {
      const result = [strings[0]];
      keys.forEach((key, i) => {
        result.push(values[key], strings[i + 1]);
      });
      return result.join('');
    };
    const message = template`a: ${'a'}, b: ${'b'}`;
    print(message({ a, b }));

     
    const generateId = idGenerator();
    print('Generated IDs:', generateId.next().value, generateId.next().value);

     
    print(proxiedData.key1);
    print(proxiedData.key2);

     
    const uniqueValues = new Set([a, b, 1, 2, 3]);
    print('Unique Values Set:', uniqueValues);

    const valueMap = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
    print('Value from Map for key 2:', valueMap.get(2));

  } catch (err) {
    console.error('Error fetching data:', err);
  }
})();
