 
const { readFile } = require('fs').promises;

 
async function displayFileContent(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    print('File Content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

 
const targetObject = { message: 'Hello, world!' };
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.message);
proxy.message = 'Hello, universe!';

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}${values[i] ? `<<${values[i]}>>` : ''}`, '');
}

const name = 'JavaScript';
print(tag`Welcome to ${name}, a world of endless possibilities!`);

 
const user = {
  profile: {
    name: 'Jane Doe',
  }
};

print(user.profile?.name ?? 'Anonymous');
print(user.profile?.age ?? 'Age not available');

 
displayFileContent('example.txt');
