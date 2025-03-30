(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
   
  async function* asyncNumberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
      await delay(100);  
      yield i;
    }
  }

   
  const user = {
    name: 'Alice',
    age: 25,
  };

  const userProxy = new Proxy(user, {
    get(target, property) {
      print(`Property '${property}' accessed`);
      return target[property];
    }
  });

  print(`User Name: ${userProxy.name}`);

   
  const frequencyCounter = str => {
    return [...str].reduce((map, char) => {
      map.set(char, (map.get(char) || 0) + 1);
      return map;
    }, new Map());
  };

  print(frequencyCounter('Hello, world!'));

   
  const _privateData = new WeakMap();

  class Secret {
    constructor(secret) {
      _privateData.set(this, secret);
    }
    
    reveal() {
      return _privateData.get(this);
    }
  }

  const secretInstance = new Secret('Top Secret Info');
  print(secretInstance.reveal());

   
  for await (const num of asyncNumberGenerator(5)) {
    print(`Generated number: ${num}`);
  }
})();
