 
import { readFile } from 'fs/promises';

 
(async () => {
  try {
     
    const data = await import('./data.json', { assert: { type: 'json' } });
    
     
    const { name, age = 25 } = data;

     
    const hobby = data?.hobby ?? 'Coding';

     
    const map = new Map(Object.entries(data));
    
     
    const id = Symbol('uniqueId');

     
    const proxy = new Proxy(data, {
      get: (target, prop) => {
        return prop in target ? target[prop] : `Property ${String(prop)} does not exist`;
      }
    });

     
    const taggedTemplate = (strings, ...values) => {
      return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<b>${values[i]}</b>` : '');
      }, '');
    };

     
    const [fileContent, message] = await Promise.allSettled([
      readFile('example.txt', 'utf8'),
      Promise.resolve('All tasks are completed!')
    ]);

     
    print(taggedTemplate`User: ${name}, Age: ${age}, Hobby: ${hobby}`);
    print(`Map content:`, [...map]);
    print(`Proxy test (existing):`, proxy.name);
    print(`Proxy test (non-existing):`, proxy.nonExistingProperty);
    print(`Symbol ID:`, id.toString());
    print(`File content:`, fileContent.status === 'fulfilled' ? fileContent.value : 'File read error');
    print(`Message:`, message.status === 'fulfilled' ? message.value : 'Message error');
  } catch (error) {
    console.error('Error:', error);
  }
})();
