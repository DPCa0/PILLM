 
const advancedExample = (() => {
   
  const dataMap = new Map();
  dataMap.set('name', 'Advanced JS');
  dataMap.set('year', new Date().getFullYear());

   
  const handler = {
    set(target, property, value) {
      if (typeof value === 'string') {
        print(`Setting ${property} to ${value}`);
        target[property] = value.toUpperCase();  
        return true;
      }
      console.warn(`Failed to set ${property}: ${value} is not a string`);
      return false;
    }
  };

   
  const proxy = new Proxy(dataMap, handler);

   
  function* iterateData(map) {
    for (let [key, value] of map) {
      yield `${key}: ${value}`;
    }
  }

   
  const uniqueSymbol = Symbol('unique');
  proxy[uniqueSymbol] = 'Hidden Message';

   
  return () => {
    proxy.set('author', 'Jane Doe');
    proxy.set('language', 'JavaScript');

    print('Data Entries:');
    for (let entry of iterateData(proxy)) {
      print(entry);
    }

    print('Symbol data:', proxy[uniqueSymbol]);
  };
})();

 
advancedExample();
