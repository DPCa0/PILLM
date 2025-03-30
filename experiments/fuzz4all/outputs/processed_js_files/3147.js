 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs').promises;

 
(async () => {
  try {
     
    const uniqueID = Symbol('id');
    const dataStore = new Map();

     
    const handler = {
      get: (target, prop) => {
        print(`Getting property ${String(prop)}`);
        return target[prop];
      },
      set: (target, prop, value) => {
        print(`Setting property ${String(prop)} to ${value}`);
        target[prop] = value;
        return true;
      },
    };

    let data = { [uniqueID]: 1, name: 'Sample' };
    const proxiedData = new Proxy(data, handler);

     
    const saveDataToFile = async (data) => {
      await fs.writeFile('data.json', JSON.stringify(data, null, 2));
      print('Data saved to file');
    };

     
    function* idGenerator() {
      let id = 1;
      while (true) {
        yield id++;
      }
    }

    const generator = idGenerator();

     
    for (let i = 0; i < 3; i++) {
      const id = generator.next().value;
      dataStore.set(id, { ...proxiedData, id, name: `Item ${id}` });
    }

    print([...dataStore.entries()]);

     
    proxiedData.name = 'Updated Sample';
    await saveDataToFile([...dataStore.entries()]);
  } catch (error) {
    console.error('Error:', error);
  }
})();
