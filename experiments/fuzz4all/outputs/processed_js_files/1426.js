 
class AdvancedFeatures {
  #privateField = 42;
  
  static async *generatorAsync() {
    for (let i = 0; i < 3; i++) {
      yield await Promise.resolve(i);
    }
  }

  getPrivateField() {
    return this.#privateField;
  }

  async processGenerator() {
    let result = [];
    for await (const value of AdvancedFeatures.generatorAsync()) {
      result.push(value);
    }
    return result;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${String(prop)} not found`;
    }
  }
};

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, str, i) => acc + str + (values[i] ? values[i] : ''), '');
}

const taggedResult = tag`Line 1\nLine 2\twith tab\nValue: ${Math.random()}`;

 
const [a, ...rest] = [10, 20, 30, 40];
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1, z: 3 };

 
const instance = new AdvancedFeatures();
const proxyInstance = new Proxy(instance, handler);

 
(async () => {
  print(proxyInstance.getPrivateField());
  print(await proxyInstance.processGenerator());
  print(taggedResult);
  print(`Destructured first: ${a}, rest: ${rest}`);
  print(`Spread object: `, obj2);
})();
