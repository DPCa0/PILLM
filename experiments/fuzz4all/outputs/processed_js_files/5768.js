 
(async () => {
  const { promises: fs } = await import('fs');
  
   
  async function readFileAsync(path) {
    try {
      const data = await fs.readFile(path, { encoding: 'utf8' });
      print('File content:', data);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

   
  const target = { message: 'Hello, Proxy!' };
  const handler = {
    get: (obj, prop) => {
      print(`Accessed property: "${prop}"`);
      return prop in obj ? obj[prop] : `Property "${prop}" not found.`;
    }
  };
  const proxy = new Proxy(target, handler);

  print(proxy.message);  
  print(proxy.nonExistentProp);  

   
  const user = {
    name: 'Jane Doe',
    preferences: {
      theme: null
    }
  };
  const theme = user.preferences?.theme ?? 'default';
  print('User theme:', theme);  

   
  await readFileAsync('example.txt');
})();
