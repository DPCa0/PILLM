 

class Hex {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `0x${this.value.toString(16).toUpperCase()}`;
  }

  valueOf() {
    return this.value;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return this.toString();
    return this.value;
  }
}

const hex1 = new Hex(255);
print(String(hex1));  

const asyncOp = async () => {
  return new Promise((resolve) => setTimeout(() => resolve('Async Op Complete'), 1000));
};

(async () => {
  try {
    print('Starting...');
    const result = await asyncOp();
    print(result);

    const map = new Map([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);

    map.set('key3', 'value3');

    for (const [key, value] of map) {
      print(`${key}: ${value}`);
    }

    const objectProxy = new Proxy({ greeting: 'Hello, World!' }, {
      get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop.toString()} doesn't exist`;
      }
    });

    print(objectProxy.greeting); // "Hello, World!"
    print(objectProxy.nonExistent); // "Property nonExistent doesn't exist"

  } catch (error) {
    console.error(error);
  }
})();
