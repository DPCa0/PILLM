 
(async () => {
  const fs = await import('fs/promises');

   
  async function readAndWriteFile(inputPath, outputPath) {
    try {
       
      const data = await fs.readFile(inputPath, 'utf-8');
      
       
      const transformer = {
        data: data.toUpperCase(),
        get transformedData() {
          return this.data.replace(/HELLO/g, 'HI');
        }
      };

      const proxy = new Proxy(transformer, {
        get(target, prop) {
          print(`Accessing property '${prop}'`);
          return target[prop];
        }
      });

       
      await fs.writeFile(outputPath, proxy.transformedData);
      print(`Data written to ${outputPath}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }

   
  readAndWriteFile('input.txt', 'output.txt').then(() => {
    print('File processing completed.');
  }).catch(err => {
    console.error('Failed to process file:', err);
  });
})();
