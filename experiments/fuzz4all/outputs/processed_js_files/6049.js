 
import { readFile } from 'fs/promises';

 
(async () => {
  try {
     
    const data = await readFile(new URL('./data.json', import.meta.url), 'utf8');

     
    const items = JSON.parse(data);

     
    const itemMap = new Map(items.map(item => [item.id, { ...item }]));

     
    const itemHandler = {
      get(target, prop) {
        if (prop in target) {
          print(`Accessing property "${prop}"`);
          return target[prop];
        }
        console.warn(`Property "${prop}" not found`);
        return null;
      },
      set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
      }
    };

    const proxiedMap = new Proxy(itemMap, itemHandler);

     
    const itemId = 1;
    if (proxiedMap.has(itemId)) {
      const item = proxiedMap.get(itemId);
      print(`Original Name: ${item.name}`);
      item.name = 'Updated Name';
      proxiedMap.set(itemId, item);
      print(`Updated Name: ${proxiedMap.get(itemId).name}`);
    }

     
    function* itemGenerator() {
      for (const [id, item] of proxiedMap.entries()) {
        yield { id, ...item };
      }
    }

     
    const generator = itemGenerator();
    for (const item of generator) {
      print(`Item ID: ${item.id}, Name: ${item.name}`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
