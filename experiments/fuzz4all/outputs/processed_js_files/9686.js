 
import { promises as fs } from 'fs';
import path from 'path';

 
(async () => {
  try {
     
    const fileName = 'sample.txt';
    const filePath = path.join(process.cwd(), `./${fileName}`);

     
    const config = {
      encoding: 'utf-8',
      content: 'Hello, Advanced JavaScript!'
    };
    const encoding = config?.encoding ?? 'utf-8';
    
     
    await Promise.all([
      fs.writeFile(filePath, config?.content ?? 'Default Content', encoding),
      fs.readFile(filePath, encoding).then(content => console.log('File content:', content))
    ]);

     
    const complexObject = { a: { b: { c: 42 } } };
    const { a: { b: { c } } } = complexObject;
    print('Destructured Value:', c);

     
    const target = { message: 'Hello, Proxy!' };
    const handler = {
      get: (obj, prop) => {
        print(`Accessing property '${prop}'`);
        return obj[prop];
      }
    };
    const proxy = new Proxy(target, handler);
    print(proxy.message);
    
     
    function* numberGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }
    const numbers = [...numberGenerator()];
    print('Generated Numbers:', numbers);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
