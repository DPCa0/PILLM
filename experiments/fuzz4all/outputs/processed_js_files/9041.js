 

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Getting value for ${property}`);
      return Reflect.get(target, property, receiver);
    } else {
      throw new Error(`${property} does not exist on target`);
    }
  },
  set(target, property, value) {
    if (typeof value === 'number') {
      print(`Setting value for ${property} to ${value}`);
      return Reflect.set(target, property, value);
    } else {
      throw new TypeError(`Value for ${property} must be a number`);
    }
  }
};

const data = new Proxy({ a: 10, b: 20 }, handler);

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched successfully'), 1000);
  });
}

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const map = new Map();
map.set('key1', { name: 'Item 1', details: { price: 100, available: true } });
map.set('key2', { name: 'Item 2', details: { price: 200, available: false } });

 
async function* asyncDataGenerator() {
  for (let i = 0; i < 3; i++) {
    yield await fetchData();
  }
}

(async () => {
   
  try {
    print(data.a);  
    data.b = 30;  
  } catch (error) {
    console.error(error);
  }

   
  const fetchMessage = await fetchData();
  print(fetchMessage);

   
  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  

   
  for (let [key, value] of map) {
    print(`${key}:`, value);
  }

   
  const asyncGen = asyncDataGenerator();
  for await (const message of asyncGen) {
    console.log(message