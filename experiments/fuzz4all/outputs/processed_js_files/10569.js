 
(async () => {
  const fs = await import('fs/promises');
  
   
  const handler = {
    get: function(target, prop, receiver) {
      if (prop in target) {
        print(`Property "${prop}" accessed.`);
        return Reflect.get(...arguments);
      }
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    },
    set: function(target, prop, value) {
      print(`Setting value for "${prop}" to "${value}".`);
      return Reflect.set(...arguments);
    }
  };

  const person = new Proxy({name: 'John Doe', age: 30}, handler);

   
  function* numberSequence(...initialNumbers) {
    let number = initialNumbers.pop() || 0;
    while (true) {
      yield number++;
    }
  }

  const [first, second, third] = numberSequence(...[5, 10]);
  
   
  function html(strings, ...values) {
    return strings.reduce((result, string, i) => (
      result + string + (values[i] || '')
    ), '');
  }

  const message = 'world';
  const template = html`<div>Hello, ${message}!</div>`;

   
  async function readFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      print(`File content: ${data}`);
    } catch (err) {
      console.error(`Error reading file: ${err}`);
    }
  }

   
  print(person.name);
  person.age = 31;
  print(`First three numbers: ${first}, ${second}, ${third}`);
  print(template);

   
  await readFile('example.txt');
})();
