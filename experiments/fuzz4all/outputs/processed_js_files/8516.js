 
import { promises as fs } from 'fs';

 
async function processData() {
  try {
     
    const { default: data } = await import('./data.json', { assert: { type: 'json' } });

     
    const uniqueItems = new Set(data.items);

     
    const clonedItems = [...uniqueItems].map(({ id, value }) => ({ id, value: value * 2 }));

     
    const taggedTemplate = (strings, ...values) => 
      strings.reduce((result, str, i) => `${result}${str}${values[i] ? `[${values[i]}]` : ''}`, '');
    
    const resultString = taggedTemplate`Processed ${clonedItems.length} items, first item: ${clonedItems[0].id}`;

    print(resultString);

     
    const handler = {
      get(target, prop) {
        if (prop === 'secret') {
          return 'You found the secret!';
        }
        return Reflect.get(...arguments);
      }
    };

    const proxy = new Proxy({ ...clonedItems[0] }, handler);
    print(proxy.secret);  

     
    await fs.writeFile('./output.json', JSON.stringify(clonedItems, null, 2));
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

processData();

This program demonstrates various advanced JavaScript features, including async/await, dynamic imports, sets, destructuring, proxies, and more, in a complex but illustrative way.