 
const uniqueKey = Symbol('unique');

 
const dynamicObject = {
  [uniqueKey]: 'value',
  regularKey: 42
};

 
const handler = {
  get(target, property, receiver) {
    print(`Property '${String(property)}' accessed`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Property '${String(property)}' set to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

const proxiedObject = new Proxy(dynamicObject, handler);

 
function* complexGenerator(start = 0) {
  let index = start;
  while (true) {
    yield { index, square: index * index };
    index++;
  }
}

const generatorInstance = complexGenerator();

 
async function fetchModule() {
  const { default: _ } = await import('lodash');
  const data = generatorInstance.next().value;
  print(_.omit(data, ['index']));
}

proxiedObject[uniqueKey];  
proxiedObject.regularKey = 100;  

fetchModule().then(() => print('Module loaded and data processed'));
