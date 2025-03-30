 
const logger = new Proxy({}, {
  get(target, prop) {
    print(`Accessed property: ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
logger.name = "JavaScript";
logger.version = "ES2023";

 
const uniqueID = Symbol("id");
logger[uniqueID] = 12345;

 
async function* asyncGenerator() {
  yield await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve(2), 1000));
}

 
function logNumbers(...nums) {
  print(...nums.map(n => `Number: ${n}`));
}

 
(async () => {
  print("Start async operation");
  for await (const num of asyncGenerator()) {
    print(`Yielded: ${num}`);
  }
  print("Async operation complete");

   
  logNumbers(...[3, 4, 5]);
})();

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] ? `[${values[i]}]` : ''), '');
}

const interpolation = tag`Welcome, ${logger.name} version ${logger.version}!`;
print(interpolation);

 
logger.language = "Node.js";
