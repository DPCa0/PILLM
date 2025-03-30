 
import { readFile } from 'fs/promises';

 
async function complexOperation() {
  try {
     
    const data = await readFile('./data.json', 'utf8');
    const parsedData = JSON.parse(data);

     
    const { items } = parsedData;
    const filteredItems = items.filter(({ active }) => active);

     
    const itemMap = new Map(filteredItems.map(item => [item.id, item]));

     
    const proxyHandler = {
      set(target, prop, value) {
        if (prop === 'name' && typeof value !== 'string') {
          throw new Error('Name must be a string');
        }
        target[prop] = value;
        return true;
      },
    };
    
    const firstItem = itemMap.values().next().value;
    const proxiedItem = new Proxy(firstItem, proxyHandler);

     
    const uniqueKey = Symbol('uniqueKey');
    proxiedItem[uniqueKey] = 'This is a unique property';

    print(proxiedItem);

     
    async function* asyncGenerator(array) {
      for (const item of array) {
        await new Promise(res => setTimeout(res, 100));  
        yield item;
      }
    }

     
    for await (const item of asyncGenerator(filteredItems)) {
      print(`Processed: ${item.name}`);
    }

  } catch (error) {
    console.error('Error during complex operation:', error);
  }
}

 
complexOperation();
