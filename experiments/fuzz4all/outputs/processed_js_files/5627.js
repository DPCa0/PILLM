(async () => {
   
  const logHandler = {
    get(target, prop) {
      if (prop in target) {
        print(`Property '${prop}' accessed.`);
        return target[prop];
      }
      throw new Error(`Property '${prop}' not found.`);
    }
  };

  const sym = Symbol('unique');
  let targetObject = { a: 1, [sym]: 'hidden' };
  const proxy = new Proxy(targetObject, logHandler);

   
  const { a, ...rest } = { a: 5, b: 10, c: 20 };
  
   
  function* generator() {
    yield* [1, 2, 3];
  }

  for (const value of generator()) {
    print(`Generator value: ${value}`);
  }
  
   
  const map = new Map([[1, 'one'], [2, 'two']]);
  const set = new Set(['a', 'b', 'c']);
  const weakMap = new WeakMap();
  const obj = {};
  weakMap.set(obj, 'value');

  print(map.get(1));        
  print(set.has('b'));      
  print(weakMap.get(obj));  

   
  function asyncTask(value) {
    return new Promise(resolve => setTimeout(() => resolve(value), 1000));
  }
  
  const fetchData = async () => {
    const data = await asyncTask('Fetched Data');
    print(data);
  };
  
  await fetchData();

   
  print(proxy[sym]);  
  
   
  function tag(strings, ...values) {
    return strings.raw[0] + values.map((v, i) => `${v}${strings.raw[i + 1]}`).join('');
  }
  
  const rawString = tag`Hello, \nWorld!`;
  print(rawString);
})();
