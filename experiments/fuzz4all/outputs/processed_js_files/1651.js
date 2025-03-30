 
import { readFile, writeFile } from 'fs/promises';
import { createServer } from 'http';

 
const readAndWriteFile = async () => {
  try {
    const filePath = './data.json';
    
     
    const data = JSON.parse(await readFile(filePath, 'utf8'))?.data || [];
    
     
    const transformedData = data
      .map(({ id, value }) => ({ id, value: value * 2 }))
      .filter(({ value }) => value > 10);
    
     
    await writeFile(
      filePath,
      JSON.stringify({ data: transformedData }, null, 2)
    );

    print('File has been written successfully!');
  } catch (error) {
    console.error('Error reading/writing file:', error);
  }
};

 
(async () => {
   
  const results = await Promise.allSettled([
    readAndWriteFile(),
    import('crypto').then(crypto => crypto.randomUUID()),
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Promise ${index + 1} fulfilled with value:`, result.value);
    } else {
      console.error(`Promise ${index + 1} rejected with reason:`, result.reason);
    }
  });

   
  const handler = {
    get(target, property) {
      if (property === 'status') {
        return 'Server is running!';
      }
      return target[property];
    }
  };

  const serverStatus = new Proxy({}, handler);

   
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, World! ${serverStatus.status}\n`);
  });

  server.listen(3000, () => {
    print('Server is listening on port 3000');
  });
})();
