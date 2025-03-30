 
async function* numberStream() {
  let i = 0;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

 
const logger = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property '${prop}' does not exist on target.`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({ a: 1, b: 2 }, logger);

 
const privateField = Symbol('privateField');

class AdvancedClass {
  constructor() {
    this[privateField] = 42;
  }

  getPrivateField() {
    return this[privateField];
  }
}

 
function tag(strings, ...values) {
  return strings.reduce((prev, curr, i) => prev + curr + (values[i] ? `[${values[i]}]` : ''), '');
}

 
(async function main() {
  obj.a = 10;
  print(obj.a);
  print(obj.nonexistent);

  const instance = new AdvancedClass();
  print('Private field:', instance.getPrivateField());

  print(tag`This is a ${'tagged'} template ${'literal'}.`);

  for await (const num of numberStream()) {
    print('Number:', num);
    if (num >= 5) break;
  }
})();
