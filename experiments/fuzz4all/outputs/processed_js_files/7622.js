 
const fs = require('fs').promises;

 
(async () => {
  try {
     
    const handler = {
      get: function(obj, prop) {
        return prop in obj ? obj[prop] : `Property ${prop} not found`;
      }
    };

    const target = { hello: 'world', foo: 'bar' };
    const proxy = new Proxy(target, handler);

    print(proxy.hello);  
    print(proxy.nonExistentProp);  

     
    const tagged = (strings, ...values) => {
      return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
    };

    const name = 'Advanced JS';
    print(tagged`This is an example of ${name} features.`);

     
    const data = await fs.readFile('./example.txt', 'utf8');
    print('File Content:', data);

     
    const complexKey1 = { id: 1 };
    const complexKey2 = { id: 2 };
    const map = new Map();

    map.set(complexKey1, 'Value associated with key1');
    map.set(complexKey2, 'Value associated with key2');

    print(map.get(complexKey1));  

  } catch (error) {
    console.error('Error:', error);
  }
})();
