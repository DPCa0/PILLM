 
async function* asyncCounter(limit) {
  let count = 0;
  while (count < limit) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield count++;
  }
}

 
function createLoggingObject(initialObject) {
  return new Proxy(initialObject, {
    get(target, property) {
      print(`Getting property: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting property: ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  });
}

 
const uniqueKey = Symbol('unique');
const complexMap = new Map();
complexMap.set(uniqueKey, { data: 'Unique Data' });

const logObject = createLoggingObject({ name: 'JavaScript', version: 2023 });

 
(async () => {
  print(`Unique key data:`, complexMap.get(uniqueKey).data);

  for await (let number of asyncCounter(5)) {
    print(`Async counter value: ${number}`);
  }

  print(`Object name before update: ${logObject.name}`);
  logObject.name = 'Node.js';
  print(`Object name after update: ${logObject.name}`);
})();
