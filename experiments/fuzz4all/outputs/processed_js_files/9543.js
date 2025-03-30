 
import { promises as fs } from 'fs';
import { promisify } from 'util';
import crypto from 'crypto';

 
(async () => {
  try {
     
    const data = await fs.readFile('./data.json', 'utf8');
    const json = JSON.parse(data);

     
    const uniqueItems = new Set(json.items);
    const itemCounts = new Map();

    uniqueItems.forEach(item => {
       
      const countMessage = tag`Item: ${item}, Count: ${json.items.filter(i => i === item).length}`;
      itemCounts.set(item, countMessage);
    });

     
    const specialItem = json.specialItem ?? 'defaultItem';

     
    const generateHash = promisify(crypto.pbkdf2);
    const hash = await generateHash(specialItem, 'salt', 1000, 64, 'sha512');

     
    print('Item Counts:', [...itemCounts.entries()]);
    print('Special Item Hash:', hash.toString('hex'));

  } catch (error) {
    console.error('Error:', error);
  }
})();

 
function tag(strings, ...values) {
  return strings.reduce((prev, current, i) => `${prev}${current}${values[i] ? values[i] : ''}`, '');
}
This program uses various advanced JavaScript features including ES6 modules, async/await, promises, template literals, Map and Set, optional chaining, nullish coalescing, and tagged template literals for processing a JSON file and performing asynchronous operations.