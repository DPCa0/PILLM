 
import { promises as fs } from 'fs';
import { promisify } from 'util';

 
const loggerProxy = new Proxy(console, {
  get(target, property) {
    if (property === 'log') {
      return function (...args) {
        target[property]('[LOG]', ...args);
      };
    }
    return target[property];
  },
});

 
(async () => {
  try {
     
    const data = await fs.readFile('input.txt', 'utf-8');

     
    const processedData = processTemplate`${data}`;

     
    await fs.writeFile('output.txt', processedData);

     
    loggerProxy.log('File processing complete.');
  } catch (error) {
    loggerProxy.error('Error:', error);
  }
})();

 
function processTemplate(strings, ...values) {
  return strings.raw.reduce((acc, str, index) => {
    let value = values[index - 1];
     
    if (typeof value === 'string') {
      value = value
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return acc + value + str;
  });
}

 
const usersMap = new Map();
const sensitiveInfoMap = new WeakMap();

class User {
  constructor(name, ssn) {
    usersMap.set(name, this);
    sensitiveInfoMap.set(this, ssn);
  }
}

 
const user1 = new User('Alice', '123-45-6789');
const user2 = new User('Bob', '987-65-4321');

loggerProxy.log(`Sensitive SSN for Alice:`, sensitiveInfoMap.get(user1));
loggerProxy.log(`Sensitive SSN for Bob:`, sensitiveInfoMap.get(user2));
