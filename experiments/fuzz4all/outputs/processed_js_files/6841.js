 

 
const uniqueKey = Symbol('unique');

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting value of ${prop}`);
      return target[prop];
    } else {
      console.warn(`${prop} does not exist`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting value of ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({ name: 'JavaScript', [uniqueKey]: 42 }, handler);

 
function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generatorFunc();

 
async function fetchData(url) {
  print('Fetching data...');
  try {
    const response = await fetch(url);
    const data = await response.json();
    print('Data received:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
   
  print(obj.name);
  obj.language = 'ECMAScript';
  print(obj.language);
  print(obj.nonExistentProp);

   
  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);

   
  await fetchData('https://jsonplaceholder.typicode.com/todos/1');
})();
