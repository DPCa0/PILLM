 
(async () => {
  try {
     
    const { promises: fs } = await import('fs');

     
    const settings = {
      path: './example.txt',
      content: 'Hello, advanced JavaScript!',
      encoding: 'utf8',
    };

     
    const writeSettings = { ...settings };
    const { path, content, encoding } = writeSettings;

     
    await fs.writeFile(path, content, encoding);
    print(`File written successfully to ${path}`);

     
    const data = await fs.readFile(path, encoding);
    print(`File content: ${data}`);

     
    const highlight = (strings, ...values) => strings.map((str, i) => `${str}\x1b[32m${values[i] || ''}\x1b[0m`).join('');
    print(highlight`Tagged Template Usage: File read from ${path}`);

     
    const handler = {
      get: (target, property) => {
        print(`Accessed property: ${property}`);
        return target[property];
      }
    };
    
    const proxy = new Proxy(settings, handler);
    print(`Proxy access: path is ${proxy.path}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
