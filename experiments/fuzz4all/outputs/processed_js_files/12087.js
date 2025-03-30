 
(async () => {
  const { promises: fs } = await import('fs');

   
  const uniqueKey = Symbol('uniqueKey');

   
  const dataObject = {
    [uniqueKey]: 'Secret Value',
    name: 'Advanced JS',
    getData() {
      return this[uniqueKey];
    },
  };

   
  const handler = {
    get(target, property, receiver) {
      print(`Accessing property: ${String(property)}`);
      return Reflect.get(target, property, receiver);
    },
  };

  const proxyData = new Proxy(dataObject, handler);

   
  async function writeAndReadData(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data));
    const fileData = await fs.readFile(filePath, 'utf8');
    print('File Content:', JSON.parse(fileData));
  }

   
  function* arrayIterator(array) {
    for (const item of array) {
      yield item;
    }
  }

  const items = ['item1', 'item2', 'item3'];
  const iterator = arrayIterator(items);

  for (const item of iterator) {
    print('Iterating item:', item);
  }

   
  const filePath = './data.json';
  const fileData = {
    project: proxyData.name,
    secret: proxyData.getData(),
  };

  await writeAndReadData(filePath, fileData);
})();
