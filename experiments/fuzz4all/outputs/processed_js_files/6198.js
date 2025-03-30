 
(async () => {
  const { randomUUID } = await import('crypto');

   
  let map = new Map();
  let set = new Set();

  const data = [
    { id: randomUUID(), name: 'Alice', age: 30 },
    { id: randomUUID(), name: 'Bob', age: 25 },
    { id: randomUUID(), name: 'Charlie', age: 35 }
  ];

   
  const addDataToCollections = ([first, ...rest]) => {
    map.set(first.id, first);
    set.add(first.name);
    if (rest.length) addDataToCollections(rest);
  };

  addDataToCollections(data);

   
  const fetchData = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(map.get(id));
      }, 1000);
    });
  };

   
  function userTag(strings, user) {
    return `${strings[0]}${user.name}${strings[1]}${user.age}${strings[2]}`;
  }

  (async () => {
    for (let id of map.keys()) {
      const user = await fetchData(id);
      print(userTag`User: ${user} is ${user} years old.`);
    }
  })();

   
  const sym = Symbol('unique');
  const obj = { [sym]: 'hidden value', visible: 'shown value' };
  print('Symbol property:', obj[sym]);

   
  const handler = {
    get: (target, property) => {
      print(`Accessing property "${property}"`);
      return target[property];
    }
  };

  const proxiedObj = new Proxy(obj, handler);
  print(proxiedObj.visible);  

})();
