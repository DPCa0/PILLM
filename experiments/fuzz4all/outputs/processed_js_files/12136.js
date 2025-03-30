 
(async () => {
  const { promises: fs } = await import('fs');

   
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        print(`Accessing property "${prop}" with value: ${target[prop]}`);
      } else {
        print(`Property "${prop}" does not exist.`);
      }
      return Reflect.get(target, prop, receiver);
    },
  };

  const data = {
    name: 'Advanced JS',
    version: '1.0',
  };

  const proxiedData = new Proxy(data, handler);

   
  const filePath = './data.json';

  try {
    await fs.writeFile(filePath, JSON.stringify(proxiedData, null, 2));
    print('File written successfully.');

    const fileContent = await fs.readFile(filePath, 'utf8');
    print('Read file content:', fileContent);

     
    print(proxiedData.name);
    print(proxiedData.unknownProp);

     
    await fs.unlink(filePath);
    print('File deleted.');
  } catch (error) {
    console.error('Error:', error);
  }
})();
