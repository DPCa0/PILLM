 
async function* dataStream() {
  const data = ['Hello', 'from', 'advanced', 'JavaScript', 'features'];
  for (let item of data) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield item;
  }
}

 
const logger = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessed property "${prop}": ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist on target`);
      return undefined;
    }
  }
};

const targetObj = { message: 'Welcome to the Proxy world!', number: 42 };
const proxiedObj = new Proxy(targetObj, logger);

 
function emphasize(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str.toUpperCase()}${values[i] ? values[i].toUpperCase() : ''}`;
  }, '');
}

 
(async () => {
  for await (let chunk of dataStream()) {
    print(emphasize`${chunk} is received.`);
  }

   
  print(proxiedObj.message);
  print(proxiedObj.nonExistentProperty);

   
  const privateData = new WeakMap();

  class Secret {
    constructor(secret) {
      privateData.set(this, secret);
    }

    reveal() {
      return privateData.get(this);
    }
  }

  const mySecret = new Secret('JavaScript is awesome!');
  print(`Revealed secret: ${mySecret.reveal()}`);
})();
