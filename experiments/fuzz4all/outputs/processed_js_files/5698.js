(async function() {
   
  const secret = Symbol('secret');
  const storage = new WeakMap();

  class SecureData {
    constructor(data) {
      this[secret] = data;
      storage.set(this, data);
    }

    getSecret() {
      return this[secret];
    }

    getStorageData() {
      return storage.get(this);
    }
  }

  const dataInstance = new SecureData('TopSecret');
  
   
  const handler = {
    get(target, property, receiver) {
      print(`Property '${property.toString()}' was accessed`);
      return Reflect.get(...arguments);
    }
  };

  const proxiedData = new Proxy(dataInstance, handler);
  print(proxiedData.getSecret());
  print(proxiedData.getStorageData());

   
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      print('Fetched data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  await fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  function* numberGenerator() {
    let number = 0;
    while (true) {
      yield number++;
    }
  }

  const gen = numberGenerator();
  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);

   
  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...rest } = obj;
  print('Rest:', rest);

  const newObj = { ...rest, d: 4 };
  print('Spread:', newObj);
})();
