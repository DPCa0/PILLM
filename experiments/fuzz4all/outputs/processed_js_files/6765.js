 
(async () => {
  const { readFile } = await import('fs/promises');

   
  function logExecutionTime(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      console.time(key);
      const result = await originalMethod.apply(this, args);
      console.timeEnd(key);
      return result;
    };
    return descriptor;
  }

   
  const trackedObject = new Proxy(
    { data: "Initial value", lastAccessed: null },
    {
      get(obj, prop) {
        obj.lastAccessed = new Date();
        return Reflect.get(obj, prop);
      },
      set(obj, prop, value) {
        obj.lastAccessed = new Date();
        return Reflect.set(obj, prop, value);
      },
    }
  );

   
  class FileReader {
    constructor(filename) {
      this.filename = filename;
    }

    @logExecutionTime
    async read() {
      const content = await readFile(this.filename, 'utf8');
      return content;
    }
  }

   
  const fileName = `example.txt`;
  
   
  const fileReader = new FileReader(fileName);

  try {
    const content = await fileReader.read();
    print(`File Content:\n${content}`);

     
    print(`TrackedObject Data: ${trackedObject.data}`);
    trackedObject.data = 'Updated value';
    print(`TrackedObject Last Accessed: ${trackedObject.lastAccessed}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
