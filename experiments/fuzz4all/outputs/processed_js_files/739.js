 
const fs = require('fs').promises;

 
(async () => {
  try {
     
    const path = await import('path');

     
    const { parse: parsePath } = path;

     
    const tag = (strings, fileName) => `${strings[0]}${fileName.toUpperCase()}${strings[1]}`;
    const filePath = tag`./example${'.txt'}`;

     
    const fileHandler = {
      async get(target, prop) {
        print(`Reading ${prop} from file`);
        return Reflect.get(target, prop);
      },
      async set(target, prop, value) {
        print(`Writing ${prop} to file`);
        return Reflect.set(target, prop, value);
      },
    };

    const fileOps = new Proxy({}, fileHandler);

     
    await fs.writeFile(filePath, 'Hello, advanced JavaScript!', 'utf8');
    fileOps.content = await fs.readFile(filePath, 'utf8');

     
    print(parsePath(filePath).base);

     
    function* readFileContent(content) {
      const lines = content.split('\n');
      for (const line of lines) {
        yield line;
      }
    }

     
    const contentGenerator = readFileContent(fileOps.content);
    print(...contentGenerator);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
