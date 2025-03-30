 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexOperation() {
   
  const [result1, result2] = await Promise.all([
    delay(1000).then(() => 'Result from Task 1'),
    delay(500).then(() => 'Result from Task 2')
  ]);

  print(`Results: ${result1}, ${result2}`);

   
  const secretSymbol = Symbol('secret');
  const dataStore = new WeakMap();

  class SecretHolder {
    constructor(secret) {
      dataStore.set(this, { [secretSymbol]: secret });
    }

    revealSecret() {
      return dataStore.get(this)[secretSymbol];
    }
  }

  const secretHolder = new SecretHolder('This is top secret!');
  print(secretHolder.revealSecret());

   
  const targetObject = {
    prop1: 'value1',
    prop2: 'value2'
  };

  const handler = {
    get(target, property) {
      print(`Accessed property: ${property}`);
      return target[property];
    }
  };

  const proxyObject = new Proxy(targetObject, handler);
  print(proxyObject.prop1);
  print(proxyObject.prop2);

   
  function* numberGenerator() {
    let number = 1;
    while (true) {
      yield number++;
    }
  }

  const gen = numberGenerator();
  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);

   
  const array = [1, 2, 3, 4, 5];
  const result = array
    .filter(x => x % 2 === 0)
    .map(x => x * 2)
    .reduce((sum, x) => sum + x, 0);
  
  print(`Functional result: ${result}`);
}

complexOperation();
