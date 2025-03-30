 
import { promises as fs } from 'fs';

 
(async () => {
   
  const SECRET_KEY = Symbol('secret');

  class ComplexObject {
    constructor(data) {
       
      this.dataMap = new Map(data);
       
      this[SECRET_KEY] = new WeakMap();
      this[SECRET_KEY].set(this, 'This is a secret value');
    }

    get secret() {
      return this[SECRET_KEY].get(this);
    }

     
    *dataGenerator() {
      for (let [key, value] of this.dataMap) {
        yield `Key: ${key}, Value: ${value}`;
      }
    }

     
    async saveToFile(filename) {
      const data = [...this.dataGenerator()].join('\n');
      await fs.writeFile(filename, data);
      print(`Data saved to ${filename}`);
    }
  }

   
  const [secretData, obj1, obj2] = await Promise.all([
    'Some Secret Info',
    new ComplexObject([
      ['name', 'Alice'],
      ['age', 30]
    ]),
    new ComplexObject([
      ['name', 'Bob'],
      ['age', 25]
    ])
  ]);

  print(`Secret Data: ${secretData}`);
  print(`Object 1 Secret: ${obj1.secret}`);
  print(`Object 2 Secret: ${obj2.secret}`);

   
  await Promise.all([
    obj1.saveToFile('obj1.txt'),
    obj2.saveToFile('obj2.txt')
  ]);
})();
