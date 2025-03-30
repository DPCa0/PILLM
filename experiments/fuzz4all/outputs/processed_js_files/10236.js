 
(async () => {
  const { readFileSync } = await import('fs');

   
  function* promiseGenerator(files) {
    for (const file of files) {
      yield new Promise((resolve, reject) => {
        try {
          const data = readFileSync(file, 'utf8');
          resolve({ file, data });
        } catch (err) {
          reject(err);
        }
      });
    }
  }

   
  async function readFiles(fileList) {
    const gen = promiseGenerator(fileList);
    for await (const fileData of gen) {
      print(`Read file: ${fileData.file}\nContent: ${fileData.data}`);
    }
  }

   
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property '${prop}'`);
      return obj[prop];
    },
  };

  const config = new Proxy({ files: ['file1.txt', 'file2.txt'] }, handler);

   
  const files = config?.files ?? [];
  if (files.length > 0) {
    await readFiles(files);
  } else {
    print('No files to read.');
  }
})();
