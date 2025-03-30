 

 
const fetchData = (delay, value) => 
  new Promise(resolve => setTimeout(() => resolve(value), delay));

 
async function* asyncGenerator() {
  yield await fetchData(1000, 'First value');
  yield await fetchData(2000, 'Second value');
  yield await fetchData(1500, 'Third value');
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Property '${prop}' accessed: ${target[prop]}`);
      return target[prop];
    } else {
      console.error(`Property '${prop}' does not exist.`);
    }
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to: ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({ key1: 'value1', key2: 'value2' }, handler);

 
const processAsyncGenerator = async () => {
  for await (const data of asyncGenerator()) {
    print(`Data fetched: ${data}`);
  }
};

 
processAsyncGenerator();

 
print(obj.key1);
obj.key3 = 'value3';
print(obj.key3);
