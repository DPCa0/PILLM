 
import fs from 'fs/promises';

 
async function processFile() {
  try {
     
    const data = await fs.readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);

     
    const handler = {
      get: function(target, prop, receiver) {
        print(`Getting ${String(prop)}`);
        return Reflect.get(...arguments);
      },
      set: function(target, prop, value, receiver) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
      }
    };

     
    const proxiedData = new Proxy(jsonData, handler);

     
    proxiedData.newProperty = 'New value';

     
    function* objectEntries(obj) {
      for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
      }
    }

     
    for (const [key, value] of objectEntries(proxiedData)) {
      print(`${key}: ${value}`);
    }

     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);

     
    await fs.writeFile('updated_data.json', JSON.stringify(proxiedData, null, 2));
    print('File updated successfully');

  } catch (error) {
    console.error('Error processing file:', error);
  }
}

processFile();
