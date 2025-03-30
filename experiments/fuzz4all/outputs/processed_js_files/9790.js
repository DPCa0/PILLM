 
const fs = require('fs');
const readline = require('readline');

 
async function readFileLines(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

   
  const uniqueLines = new Set();

   
  for await (const line of rl) {
    if (line.trim()) {
      uniqueLines.add(line.trim());
    }
  }
  
  return [...uniqueLines];
}

 
const processLines = async (filePath) => {
  try {
    const lines = await readFileLines(filePath);
    const filteredLines = lines.filter(line => line.includes('keyword'));

     
    const transformedLines = filteredLines.map((line, index) => `Line ${index + 1}: ${line.toUpperCase()}`);

    print(`Processed ${transformedLines.length} lines:`);
    print(transformedLines.join('\n'));
  } catch (err) {
    console.error(`Error processing file: ${err.message}`);
  }
};

 
(async () => {
  const filePath = './example.txt';
  
   
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    await processLines(filePath);
  } catch {
    print(`File not found: ${filePath}`);
  }
})();
