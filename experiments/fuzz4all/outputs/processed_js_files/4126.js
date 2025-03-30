 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      throw new CustomError(`Property ${prop} does not exist`);
    }
  }
};

const targetObject = {
  a: 1,
  b: 2
};

const proxy = new Proxy(targetObject, handler);

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new CustomError('Failed to fetch data');
    let data = await response.json();
    print('Data:', data);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.name + ': ' + error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

 
const array = [10, 20, 30, 40, 50];
const [first, ...rest] = array.map(num => num * 2);
print('First:', first, 'Rest:', rest);

 
const set = new Set([1, 2, 3, 4, 5]);
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
set.add(6);
map.set('key3', 'value3');

print('Set:', [...set]);
print('Map:', Array.from(map.entries()));

 
try {
  print('Proxy a:', proxy.a);
  print('Proxy b:', proxy.b);
  print('Proxy c:', proxy.c);  
} catch (error) {
  if (error instanceof CustomError) {
    console.error(error.name + ': ' + error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}

 