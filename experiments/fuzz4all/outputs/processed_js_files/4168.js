(async () => {
   
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        return `Property "${prop}" does not exist.`;
      }
    },
    set(target, prop, value) {
      if (typeof value === 'number') {
        target[prop] = value;
        return true;
      } else {
        print(`Invalid value for ${prop}. Must be a number.`);
        return false;
      }
    }
  };

  const obj = new Proxy({}, handler);

   
  obj.count = 1;  
  obj.name = "JavaScript";  
  print(obj.count);  
  print(obj.name);  

   
  const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3']
  ]);

  const set = new Set([1, 2, 3, 4, 5]);

   
  function* generator() {
    yield* map.values();
  }

  const gen = generator();
  print(gen.next().value);  
  print(gen.next().value);  

   
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    print(data);
  };

   
   

   
  print(`The set contains: ${[...set].join(', ')}`);

   
  const array = [10, 20, 30, 40, 50];
  const [first, , third, ...rest] = array;
  print(`First: ${first}, Third: ${third}, Rest: ${rest.join(', ')}`);

   
  const uniqueKey = Symbol('uniqueKey');
  const objectWithSymbol = {
    [uniqueKey]: 'symbolValue'
  };

  print(objectWithSymbol[uniqueKey]);  
})();
