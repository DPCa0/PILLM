 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const [first, ...rest] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);

     
    print(`First file content:\n${first}\n`);
    print(`Remaining files content:\n${rest.join('\n')}\n`);

     
    const uniqueLines = [...new Set(first.split('\n'))];

     
    const lineLengths = new Map(uniqueLines.map(line => [line, line.length]));

     
    for (const [line, length] of lineLengths) {
      print(`Line: "${line}" has ${length} characters`);
    }

     
    const firstFileSummary = {
      lineCount: uniqueLines.length,
      fileName: 'file1.txt',
      firstLine: uniqueLines[0] ?? 'No content',
    };

    print(`\nSummary of ${firstFileSummary.fileName}:`);
    print(`Number of unique lines: ${firstFileSummary.lineCount}`);
    print(`First line: ${firstFileSummary.firstLine}`);

  } catch (error) {
     
    console.error({ message: error?.message ?? 'An unknown error occurred' });
  }
})();
