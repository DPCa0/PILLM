 
import { promises as fsPromises } from 'fs';
import readline from 'readline';

 
async function processLineByLine(filePath) {
  const fileStream = await fsPromises.open(filePath, 'r');
  
  const rl = readline.createInterface({
    input: fileStream.createReadStream(),
    crlfDelay: Infinity
  });
  
   
  for await (const line of rl) {
    yield line;
  }
}

 
(async () => {
  try {
     
    const [data1, data2] = await Promise.all([
      fsPromises.readFile('file1.txt', 'utf-8'),
      fsPromises.readFile('file2.txt', 'utf-8')
    ]);
    
    print(`Data from file1.txt: ${data1}`);
    print(`Data from file2.txt: ${data2}`);
    
     
    const dynamicKey = 'user';
    const userData = {
      [dynamicKey]: { name: 'John Doe', age: 30 }
    };
    
    print(`User Data:`, userData);
    
     
    const { name: userName = 'Anonymous' } = userData.user || {};
    print(`Hello, ${userName}!`);
    
     
    const city = userData.user?.location ?? 'Unknown City';
    print(`Location: ${city}`);
    
     
    const handler = {
      get: (obj, prop) => prop in obj ? obj[prop] : `Property '${prop}' does not exist`
    };
    const proxyUser = new Proxy(userData.user, handler);
    
    print(`User Name: ${proxyUser.name}`);
    print(`User Age: ${proxyUser.age}`);
    print(`User City: ${proxyUser.city}`);
    
     
    for await (const line of processLineByLine('file3.txt')) {
      print(`Line from file3.txt: ${line}`);
    }
  } catch (error)