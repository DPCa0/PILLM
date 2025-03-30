 
(async () => {
  const { promises: fs } = await import('fs');

   
  const target = { greeting: 'Hello, world!', year: 2023 };
  const handler = {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Property '${prop}' accessed.`);
        return obj[prop];
      }
      return `Property '${prop}' does not exist.`;
    },
  };
  
  const proxy = new Proxy(target, handler);

   
  const fileContent = `Greeting: ${proxy.greeting}\nYear: ${proxy.year}\nAccess Attempt: ${proxy.nonExistent}`;

   
  try {
    await fs.writeFile('hello.txt', fileContent);
    print('File written successfully!');
  } catch (error) {
    console.error('Error writing file:', error);
  }
})();
