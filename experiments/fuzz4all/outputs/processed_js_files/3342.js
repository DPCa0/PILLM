 
const asyncOperation = (delay, value) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), delay)
  );

 
(async function fetchData() {
  try {
     
    const [result1, result2] = await Promise.all([
      asyncOperation(1000, 'Data from first operation'),
      asyncOperation(2000, 'Data from second operation')
    ]);

     
    const taggedTemplate = (strings, ...values) =>
      strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
    
    print(taggedTemplate`Results: \n1. ${result1} \n2. ${result2}`);

     
    function* idGenerator() {
      let id = 1;
      while (true) yield id++;
    }

    const gen = idGenerator();

     
    const config = { settings: { theme: 'dark' } };
    console.log(
      `Config Theme: ${config.settings?.theme ?? 'default'}, Unique ID: ${gen.next().value}`
    );

     
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    const set = new Set(['element1', 'element2', 'element3']);

    for (let [key, value] of map) {
      print(`Map Entry: ${key} => ${value}`);
    }

    for (let element of set) {
      print(`Set Element: ${element}`);
    }

     
    const handler = {
      get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} does not exist`
    };

    const proxy = new Proxy({ a: 1, b: 2 }, handler);
    print(proxy.a);  
    print(proxy.c);  

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
