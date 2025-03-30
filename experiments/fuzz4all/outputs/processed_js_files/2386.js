 
const fs = require('fs');
const util = require('util');

 
const readFileAsync = util.promisify(fs.readFile);

 
class AsyncFileReader {
  constructor(filePath) {
    this.filePath = filePath;
  }

   
  async *readLines() {
    try {
      const data = await readFileAsync(this.filePath, 'utf8');
      for (const line of data.split('\n')) {
        yield line.trim();
      }
    } catch (err) {
      throw new Error('Error reading file: ' + err.message);
    }
  }
}

 
(async () => {
  const fileReader = new AsyncFileReader('./sample.txt');
  const lines = fileReader.readLines();

  for await (const line of lines) {
    print(line);
  }
})();

 
const target = {
  message1: 'Hello',
  message2: 'World'
};

const handler = {
  get: (obj, prop) => {
    print(`Accessed ${prop}: ${obj[prop]}`);
    return obj[prop];
  }
};

const proxy = new Proxy(target, handler);

 
print(proxy.message1);
print(proxy.message2);

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

const name = 'JavaScript';
const message = tag`Welcome to \n\t${name}!`;
print(message);
