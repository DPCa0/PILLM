 
import('fs').then(fs => {
   
  async function readFileAsync(path) {
    try {
       
      const data = await fs.promises.readFile(path, 'utf8');
      print('File content:', data);
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

   
  const handler = {
    get: (target, name) => {
      return name in target ? target[name] : 'Property not found';
    }
  };

  const targetObject = { message: 'Hello, Proxy!' };
  const proxyObject = new Proxy(targetObject, handler);

   
  print(proxyObject.message);  
  print(proxyObject.nonExistentProperty);  

   
  const uniqueValues = new Set([1, 2, 2, 3, 4, 4, 5]);
  const valueMap = new Map();

  uniqueValues.forEach(value => {
    valueMap.set(value, `Value is: ${value}`);
  });

   
  for (let [key, value] of valueMap) {
    print(`${key}: ${value}`);
  }

   
  Promise.all([
    readFileAsync('example1.txt'),
    readFileAsync('example2.txt')
  ]).then(() => {
    print('All files have been read');
  }).catch(err => {
    console.error('Error:', err);
  });

});
