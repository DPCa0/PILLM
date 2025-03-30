 
import { readFile } from 'fs/promises';
import { createServer } from 'http';

 
async function fetchData(filePath) {
  try {
     
    const data = await readFile(`${filePath}`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const uniqueId = idGenerator();

 
const user = {
  firstName: 'John',
  lastName: 'Doe',
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }
    return `Property ${property} not found`;
  },
  set: (target, property, value) => {
    if (typeof value === 'string') {
      target[property] = value;
    } else {
      console.error('Value must be a string');
    }
  },
};

const proxyUser = new Proxy(user, handler);

 
async function init() {
  const data = await fetchData('./data.json');

   
  createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      id: uniqueId.next().value,
      user: proxyUser.firstName + ' ' + proxyUser.lastName,
      data: data,
    }));
  }).listen(3000, () => {
    print('Server listening on port 3000');
  });
}

init();
