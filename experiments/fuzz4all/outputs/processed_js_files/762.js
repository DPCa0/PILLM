 
const fs = require('fs').promises;

 
(async () => {
   
  const dataMap = new Map([
    ['name', 'Advanced JS Program'],
    ['version', '1.0.0'],
    ['features', ['async/await', 'Map', 'Set', 'Promises', 'Proxy']],
  ]);

   
  const uniqueFeatures = new Set(dataMap.get('features'));

   
  const handler = {
    get(target, prop) {
      if (prop === 'name') return `Project: ${target[prop]}`;
      return Reflect.get(...arguments);
    },
    set(target, prop, value) {
      if (prop === 'version') {
        print(`Changing version from ${target[prop]} to ${value}`);
      }
      return Reflect.set(...arguments);
    },
  };

  const proxiedData = new Proxy(
    { name: dataMap.get('name'), version: dataMap.get('version') },
    handler
  );

   
  try {
    let fileData = await fs.readFile('./project-info.txt', 'utf8');
    print('File Data:', fileData);

     
    proxiedData.version = '1.1.0';

     
    await fs.writeFile(
      './project-summary.txt',
      `${proxiedData.name}\nVersion: ${proxiedData.version}\nFeatures: ${[...uniqueFeatures].join(', ')}`
    );
    print('Project summary updated successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
