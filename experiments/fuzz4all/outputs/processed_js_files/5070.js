const { readFile } = require('fs').promises;

(async () => {
  try {
     
    const [data1, data2] = await Promise.all([
      readFile('./file1.txt', 'utf-8'),
      readFile('./file2.txt', 'utf-8')
    ]);
    
     
    const { name: name1 = 'File1', content: content1 = data1 } = JSON.parse(data1);
    const { name: name2 = 'File2', content: content2 = data2 } = JSON.parse(data2);

     
    const map = new Map([[name1, content1], [name2, content2]]);
    const allContents = [...map.values()].join('\n---\n');

     
    const uniqueWords = new Set(allContents.split(/\W+/));

     
    print(`Unique words in both files:\n${[...uniqueWords].join(', ')}`);
  } catch (err) {
    console.error(`Error reading files: ${err.message}`);
  }
})();
