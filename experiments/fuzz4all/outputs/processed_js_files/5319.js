 
(async function() {
  const { readFile } = await import('fs/promises');

   
  async function fetchConfig(filePath) {
    try {
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading config:', error);
      return {};
    }
  }

   
  function createValidatedObject(target, schema) {
    return new Proxy(target, {
      set(obj, prop, value) {
        if (schema[prop] && typeof value !== schema[prop]) {
          throw new TypeError(`Expected ${schema[prop]} but got ${typeof value}`);
        }
        obj[prop] = value;
        return true;
      }
    });
  }

   
  const uniqueKey = Symbol('uniqueKey');

   
  async function* asyncGenerator() {
    const values = ['Async', 'Generators', 'Are', 'Powerful'];
    for (const value of values) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield value;
    }
  }

   
  async function main() {
    const config = await fetchConfig('./config.json');
    const schema = { name: 'string', version: 'string' };
    const validatedConfig = createValidatedObject(config, schema);

    validatedConfig.name = 'Advanced JS Program';  
     

    print('Validated Config:', validatedConfig);

    const generator = asyncGenerator();
    for await (const value of generator) {
      print(value);
    }

    validatedConfig[uniqueKey] = 'This is a unique key!';
    print('Unique property:', validatedConfig[uniqueKey]);
  }

  main().catch(console.error);
})();
