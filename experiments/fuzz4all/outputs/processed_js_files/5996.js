 
const readline = require('readline');
const fs = require('fs').promises;

 
async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
  }
}

 
async function writeFileAsync(filePath, data) {
  try {
    await fs.writeFile(filePath, data, 'utf-8');
    print('File written successfully');
  } catch (error) {
    console.error(`Error writing file to disk: ${error}`);
  }
}

 
class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

   
  toString() {
    return `Title: ${this.title}\nContent: ${this.content}`;
  }
}

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
async function main() {
  rl.question('Enter note title: ', (title) => {
    rl.question('Enter note content: ', async (content) => {
      const note = new Note(title, content);
      print('Your note:', note.toString());

       
      await writeFileAsync('note.txt', note.toString());
      const readContent = await readFileAsync('note.txt');
      print('Read from file:', readContent);

       
      const [readTitle, readNote] = readContent.split('\n').map(line => line.split(': ')[1]);
      print(`Destructured data -> Title: ${readTitle}, Note: ${readNote}`);

      rl.close();
    });
  });
}

 
main();
