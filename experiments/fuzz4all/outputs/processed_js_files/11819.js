 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property '${prop}'`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property '${prop}' not found.`);
    }
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  },
};

 
const target = { name: 'JavaScript', year: 1995 };
const proxy = new Proxy(target, handler);

 
const { name, ...rest } = proxy;
print(`Name: ${name}`);  
proxy.year = 2021;  

 
async function* asyncGenerator() {
  yield await new Promise(resolve => setTimeout(() => resolve('Hello'), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve('World'), 1000));
}

(async () => {
  for await (let word of asyncGenerator()) {
    print(word);
  }
})();

 
class AdvancedFeature {
  #privateField = 'Private Value';

  static greet() {
    print('Welcome to Advanced JavaScript!');
  }

  getPrivateField() {
    return this.#privateField;
  }
}

AdvancedFeature.greet();
const advancedInstance = new AdvancedFeature();
print(`Private Field: ${advancedInstance.getPrivateField()}`);
