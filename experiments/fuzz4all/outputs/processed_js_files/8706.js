 
const { readFile } = require('fs').promises;

 
(async () => {
  try {
     
    const data = await readFile('./example.txt', 'utf8');

     
    const handler = {
      get: (target, property) => {
        print(`Property '${property}' accessed.`);
        return target[property];
      }
    };

    const config = new Proxy({ content: data }, handler);

     
    function* parseContent(content) {
      const lines = content.split('\n');
      for (const line of lines) {
        yield line.trim();
      }
    }

     
    const uniqueLines = new Set([...parseContent(config.content)]);

     
    const lineSummary = [...uniqueLines]
      .map(line => ({ line, length: line.length }))
      .reduce((acc, curr) => {
        acc[curr.length] = (acc[curr.length] || 0) + 1;
        return acc;
      }, {});

     
    console.log(`Line summary:
    ${Object.entries(lineSummary)
      .map(([len, count]) => `Length: ${len}, Count: ${count}`)
      .join('\n    ')}
    \nFirst line: ${[...uniqueLines]?.[0] || 'N/A'}`);
  } catch (error) {
    console.error('Error reading the file:', error);
  }
})();

This JavaScript program makes use of various advanced features such as async/await, Proxies, Generators, Sets, destructuring, template literals, optional chaining, and built-in Node.js modules to perform file operations, handle data uniquely, and summarize file content.