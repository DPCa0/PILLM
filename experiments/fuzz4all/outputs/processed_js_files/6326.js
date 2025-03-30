 
const logHandler = {
  get(target, property) {
    print(`Getting ${property}`);
    return property in target ? target[property] : 42;
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({}, logHandler);

 
(async () => {
  const module = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash-es.js');
  print('Lodash module loaded');
  
   
  const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });
  const newObj = mergeObjects({ a: 1 }, { b: 2 });
  print(newObj);

   
  const tag = (strings, ...values) => strings.map((str, i) => `${str.toUpperCase()}${values[i] || ''}`).join('');
  const dynamicStr = tag`Value of a is ${newObj.a} and value of b is ${newObj.b}`;
  print(dynamicStr);

   
  obj.x = 100;
  print(obj.x);
  print(obj.y);  
})();

 
function* generatorFunction() {
  yield 'Hello';
  yield 'World';
  return '!';
}

const iterator = generatorFunction();
let result = iterator.next();
while (!result.done) {
  print(result.value);
  result = iterator.next();
}
