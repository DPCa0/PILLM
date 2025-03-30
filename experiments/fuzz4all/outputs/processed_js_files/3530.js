 
import { readFile } from 'fs/promises';

 
const readJSON = async (filePath) => {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
};

 
function taggedLiteral(strings, ...expressions) {
  return strings.reduce((acc, str, i) => acc + str + (expressions[i] || ''), '');
}

 
const handler = {
  get(target, property, receiver) {
    print(`Property '${property}' has been accessed.`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Property '${property}' has been set to '${value}'.`);
    return Reflect.set(target, property, value, receiver);
  }
};

const targetObject = { name: 'JavaScript', type: 'Programming Language' };
const proxyObject = new Proxy(targetObject, handler);

proxyObject.name;  
proxyObject.version = 'ES2023';  

 
async function* asyncGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

(async () => {
  for await (let num of asyncGenerator(5)) {
    print(`Async Number: ${num}`);
  }
})();

 
const user = {
  profile: {
    name: 'John Doe',
    address: null
  }
};

print(user.profile?.address?.city ?? 'Address not available');  
