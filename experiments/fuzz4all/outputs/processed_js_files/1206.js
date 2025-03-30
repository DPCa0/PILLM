 
const advancedObject = {
  _secret: 42,
  get secret() {
    return this._secret;
  },
  set secret(value) {
    if (typeof value === 'number') {
      this._secret = value;
    } else {
      throw new Error('Secret must be a number');
    }
  },
  async calculate(value) {
     
    const result = await new Promise((resolve) => 
      setTimeout(() => resolve(this._secret * value), 1000)
    );
    return result;
  }
};

 
const handler = {
  get: (target, prop) => {
    print(`Getting property: ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxyObject = new Proxy(advancedObject, handler);

 
async function main() {
  proxyObject.secret = 10;
  print('Secret:', proxyObject.secret);

  const promises = [
    proxyObject.calculate(2),
    proxyObject.calculate(3),
    proxyObject.calculate(4)
  ];

  try {
    const results = await Promise.all(promises);
    print('Results:', results);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
