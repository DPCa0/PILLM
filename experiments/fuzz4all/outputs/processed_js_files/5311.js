(async () => {
   
  const handler = {
    get(target, prop) {
      print(`Property ${String(prop)} has been accessed`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      print(`Setting value ${value} to property ${String(prop)}`);
      return Reflect.set(target, prop, value);
    }
  };

  const targetObj = { a: 1, b: 2 };
  const proxy = new Proxy(targetObj, handler);
  
   
  const fetchData = async () => {
    const result = new Promise((resolve) => {
      setTimeout(() => {
        proxy.a = 10;   
        resolve(proxy.a);
      }, 1000);
    });
    print('Fetching data...');
    const data = await result;
    print(`Fetched data: ${data}`);
  };

   
  function* generatorFunc() {
    yield 'First value';
    yield* [proxy.a, proxy.b];  
    yield 'Last value';
  }

   
  const mySymbol = Symbol('mySymbol');
  proxy[mySymbol] = 'Symbol value';

   
  print(`Access symbol property: ${proxy[mySymbol]}`);
  await fetchData();
  
  print('Using generator:');
  const gen = generatorFunc();
  for (const value of gen) {
    print(value);
  }

   
  const mySet = new Set([proxy.a, proxy.b]);
  const myMap = new Map([[proxy.a, 'Value A'], [proxy.b, 'Value B']]);
  
  print('Set and Map:');
  print(mySet);
  print(myMap);

   
  const arr = Array.from(mySet);
  print('Mapped array:', arr.map(x => x * 2));
})();
