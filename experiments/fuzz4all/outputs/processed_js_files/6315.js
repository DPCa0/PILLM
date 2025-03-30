 
import { writeFile } from 'fs/promises';

 
const handler = {
  get: function(target, property) {
    print(`Accessing property "${property}" with value: ${target[property]}`);
    return target[property];
  }
};

 
const targetObject = {
  message: "Hello, Advanced JavaScript!",
  number: 42,
};

 
const proxyObject = new Proxy(targetObject, handler);

 
function format(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

const user = 'John Doe';
const formattedMessage = format`User: ${user}, Message: ${proxyObject.message}`;

 
async function writeMessageToFile(filePath, message) {
  try {
    await writeFile(filePath, message);
    print('Message written to file successfully.');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

 
const userMap = new Map();
userMap.set(user, { id: 1, role: 'admin' });

 
const { id = 0, role = 'guest' } = userMap.get(user) || {};

 
const safeAccessMessage = proxyObject?.message ?? 'No message available';

print(formattedMessage);
print(`User ID: ${id}, Role: ${role}`);
print(`Safe Access Message: ${safeAccessMessage}`);

 
(async () => {
  await writeMessageToFile('./message.txt', formattedMessage);
})();

 
const numbersSet = new Set([1, 2, 3, 2, 1]);
const numbersArray = [...numbersSet];
print('Unique numbers:', numbersArray);
