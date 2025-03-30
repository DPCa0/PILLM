 
import fs from 'fs/promises';

 
async function readFiles(files) {
  try {
     
    const contents = await Promise.all(files.map(file => fs.readFile(file, 'utf8')));
    print('File contents:', contents);
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

 
const data = { counter: 0 };
const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};
const proxyData = new Proxy(data, handler);

 
proxyData.counter = 42;   
print(proxyData.counter);   

 
function* fibonacci(n) {
  let a = 0, b = 1, current = 0;
  for (let i = 0; i < n; i++) {
    yield current;
    [a, b] = [b, a + b];
    current = a;
  }
}

 
for (let num of fibonacci(10)) {
  print(num);
}

 
const config = {
  server: {
    host: 'localhost',
    port: 8000
  }
};

const serverPort = config.server?.port ?? 3000;
print(`Server will run on port: ${serverPort}`);

 
readFiles(['./file1.txt', './file2.txt']);
