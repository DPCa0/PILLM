 
(async () => {
  const { promises: fs } = await import('fs');

   
  async function* readLines(filePath) {
    const fileHandle = await fs.open(filePath, 'r');
    try {
      let buffer = '';
      for await (const chunk of fileHandle.readLines()) {
        buffer += chunk;
        let lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          yield line;
        }
      }
      if (buffer) yield buffer;  
    } finally {
      await fileHandle.close();
    }
  }

   
  const handler = {
    get: (target, prop, receiver) => {
      if (prop in target) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop, receiver);
      } else {
        throw new Error(`Property "${prop}" does not exist.`);
      }
    }
  };

  const person = new Proxy({ name: 'Alice', age: 30 }, handler);

   
  const extendedPerson = { ...person, occupation: 'Engineer' };

  print(extendedPerson);

   
  (async () => {
    for await (const line of readLines('./example.txt')) {
      print(`Read line: ${line}`);
    }
  })();

   
  function html(strings, ...values) {
    return strings.reduce((acc, str, idx) => acc + str + (values[idx] || ''), '');
  }

  const name = 'World';
  print(html`<div>Hello, ${name}!</div>`);

   
  const privateData = new WeakMap();
  
  class SecretHolder {
    constructor(secret) {
      privateData.set(this, secret);
    }
    revealSecret() {
      return privateData.get(this);
    }
  }

  const holder = new SecretHolder('MySecret');
  print(holder.revealSecret());
})();
