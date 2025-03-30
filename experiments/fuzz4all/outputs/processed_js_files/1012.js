 
import fs from 'fs/promises';

 
(async () => {
  try {
     
    const userMap = new Map([
      ['1', { name: 'Alice', age: 30 }],
      ['2', { name: 'Bob', age: 25 }],
      ['3', { name: 'Charlie', age: 35 }],
    ]);

     
    const handler = {
      get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
      },
    };

    const proxiedUserMap = new Proxy(userMap, handler);

     
    const userId = '2';
    const userData = proxiedUserMap.get(userId);

     
    const writeToFile = async (filename, data) => {
      await fs.writeFile(filename, JSON.stringify(data, null, 2));
    };

     
    await writeToFile('userData.json', userData);

    print('User data saved successfully.');
  } catch (err) {
    console.error('Error occurred:', err);
  }
})();
