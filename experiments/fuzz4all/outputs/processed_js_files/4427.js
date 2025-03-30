 
const crypto = require('crypto');

 
async function complexHashOperation(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);

  const digestPromise = new Promise((resolve, reject) => {
    try {
      const digest = hash.digest('hex');
      resolve(digest);
    } catch (error) {
      reject(error);
    }
  });

  try {
    const result = await digestPromise;
    print(`Hash for input "${input}" is: ${result}`);
  } catch (err) {
    console.error('Error computing hash:', err);
  }
}

 
const dataArray = [
  { id: 1, data: 'Hello' },
  { id: 2, data: 'World' },
  { id: 3, data: 'Advanced' },
  { id: 4, data: 'JavaScript' }
];

 
async function processDataArray(array) {
  await Promise.all(array.map(async ({ id, data }) => {
    await complexHashOperation(`${id}-${data}`);
  }));
}

 
function* idGenerator(start = 0) {
  let id = start;
  while (true) {
    yield id++;
  }
}

 
const gen = idGenerator();
const ids = Array.from({ length: 3 }, () => gen.next().value);
print(`Generated IDs: ${ids.join(', ')}`);

processDataArray(dataArray);

 
const uniqueData = new Set(['Hello', 'World', 'Hello', 'JavaScript']);
print('Unique Data:', Array.from(uniqueData));

 
const targetObject = { message: 'Intercepted' };
const handler = {
  get: (obj, prop) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(obj, prop);
  },
  set: (obj, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
};

const proxyObject = new Proxy(targetObject, handler);
proxyObject.message = 'Hello