 
(async function() {
  const fs = await import('fs/promises');
  const { promisify } = await import('util');

   
  const wait = promisify(setTimeout);

   
  async function complexFunction() {
    try {
       
      const { a, b: [c, { d } = {}] = [] } = { a: 1, b: [2, { d: 3 }] };

       
      const value = c?.toString() ?? 'Fallback';

       
      print(`Values: a = ${a}, c = ${value}, d = ${d}`);

       
      const filePath = './example.txt';
      await fs.writeFile(filePath, 'Hello, advanced JavaScript!');
      const data = await fs.readFile(filePath, 'utf8');

      print(`File Content: ${data}`);

       
      print('Waiting for 2 seconds...');
      await wait(2000);

       
      await fs.unlink(filePath);
      print('File removed');

    } catch (error) {
      console.error('Error:', error);
    }
  }

   
  await complexFunction();
})();
