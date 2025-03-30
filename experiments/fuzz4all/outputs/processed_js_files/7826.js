 
const uniqueProp = Symbol('unique');

 
class Advanced {
  #privateField = 42;

  constructor(name) {
    this.name = name;
    this[uniqueProp] = "SecretValue";
  }

  getPrivateField() {
    return this.#privateField;
  }

  static createProxy(target) {
    return new Proxy(target, {
      get: (obj, prop) => {
        if (prop in obj) {
          print(`Accessing property: ${prop}`);
          return obj[prop];
        }
        return `Property ${prop} does not exist`;
      },
      set: (obj, prop, value) => {
        if (prop.startsWith('_')) {
          print(`Cannot set private property: ${prop}`);
          return false;
        }
        obj[prop] = value;
        return true;
      },
    });
  }
}

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? values[i].toUpperCase() : '';
    return `${result}${string}${value}`;
  }, '');
}

 
async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i++;
  }
}

(async () => {
   
  const instance = Advanced.createProxy(new Advanced('ComplexInstance'));

  print(instance.name);
  print(instance.getPrivateField());
  print(instance[uniqueProp]);

   
  instance._privateField = 'Trying to set';
  instance.newProp = 'NewValue';
  print(instance.newProp);

   
  const processedString = tag`This is a ${'complex'} JavaScript ${'example'}!`;
  print(processedString);

   
  for await (const num of asyncGenerator()) {
    print(`Async number: ${num}`);
  }
})();
