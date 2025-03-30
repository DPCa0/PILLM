 
(async () => {
  const { promises: fs } = await import('fs');
  const readline = await import('readline');

   
  const readFileAsync = async (filename) => {
    try {
      const data = await fs.readFile(filename, 'utf-8');
      return data;
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      return '';
    }
  };

   
  async function* asyncNumberGenerator(n) {
    for (let i = 1; i <= n; i++) {
      yield i;
      await new Promise((resolve) => setTimeout(resolve, 100));  
    }
  }

   
  const processFile = async (filename) => {
    const fileContents = await readFileAsync(filename);
    print('File contents:', fileContents);

    print('Generated numbers:');
    for await (const num of asyncNumberGenerator(5)) {
      print(num);
    }
  };

   
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the filename to read: ', (answer) => {
    processFile(answer.trim()).then(() => rl.close());
  });
})();
