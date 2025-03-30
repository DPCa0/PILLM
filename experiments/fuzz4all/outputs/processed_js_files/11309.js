 
const { readFile } = require('fs').promises;

 
async function complexOperation() {
  try {
     
    const { log } = console;
    log('Starting complex operation...\n');
    
     
    const data = await readFile('data.json', 'utf8');
    
     
    const jsonData = JSON.parse(data)?.items || [];
    
     
    const uniqueItems = [...new Set(jsonData.map(item => item.name))];
    
     
    const taggedTemplate = (strings, ...values) =>
      strings.reduce((prev, curr, i) => prev + curr + (values[i] || ''), '');
    
    const output = taggedTemplate`Unique items (${uniqueItems.length}): ${uniqueItems.join(', ')}`;
    
     
    const handler = {
      get(target, prop) {
        if (prop === 'display') {
          return () => log(output);
        }
        return target[prop];
      }
    };
    
    const proxy = new Proxy({}, handler);
    proxy.display();
  } catch (err) {
    console.error('Error in complex operation:', err);
  }
}

complexOperation();
