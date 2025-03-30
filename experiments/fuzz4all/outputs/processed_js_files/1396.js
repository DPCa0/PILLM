 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
const generateRandomString = async (length) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

 
const fetchDataAndLog = (url) => {
  return async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      print(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

 
(async () => {
  try {
     
    const randomString = await generateRandomString(16);
    print('Random String:', randomString);

     
    await fs.writeFile('randomString.txt', randomString);
    print('Random string saved to randomString.txt');

     
    const targetObj = { message: 'Hello, Proxy!' };
    const proxyObj = new Proxy(targetObj, {
      get: (obj, prop) => {
        print(`Property '${prop}' accessed.`);
        return obj[prop];
      }
    });

     
    print(proxyObj.message);

     
    const logData = fetchDataAndLog('https://jsonplaceholder.typicode.com/todos/1');
    await logData();

  } catch (error) {
    console.error('Error:', error);
  }
})();
