 
(async () => {
  const [fs, util] = await Promise.all([
    import('fs/promises'),
    import('util')
  ]);

   
  async function* readLines(filePath) {
    const fileHandle = await fs.open(filePath, 'r');
    const readStream = fileHandle.createReadStream();
    const rl = (await import('readline')).createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      yield line;
    }
    await fileHandle.close();
  }

   
  const config = new Proxy({ filePath: 'example.txt' }, {
    get(target, prop) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    },
  });

   
  const uniqueLines = new Set();

   
  for await (const line of readLines(config.filePath)) {
    uniqueLines.add(line);
  }

  const tasks = [...uniqueLines].map((line) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(`Processed line: ${line}`);
        resolve(`Line done: ${line}`);
      }, Math.random() * 1000);
    });
  });

  const results = await Promise.allSettled(tasks);
  print('All lines processed:', results);
})();
