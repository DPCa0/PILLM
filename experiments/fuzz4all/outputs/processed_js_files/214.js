const fs = require('fs/promises');

(async function() {
  try {
     
    const data = new Map([
      ['file1', 'data1'],
      ['file2', 'data2'],
      ['file3', 'data3']
    ]);

     
    await Promise.all([...data.entries()].map(async ([fileName, content]) => {
      await fs.writeFile(`${fileName}.txt`, content);
      print(`Wrote ${fileName}.txt`);
    }));

     
    const results = await Promise.all([...data.keys()].map(async fileName => {
      const content = await fs.readFile(`${fileName}.txt`, 'utf8');
      return `${fileName}: ${content}`;
    }));

     
    const uniqueResults = new Set(results);
    uniqueResults.forEach(result => print(result));

  } catch (error) {
    console.error('Error:', error);
  }
})();
