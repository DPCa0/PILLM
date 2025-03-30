 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const logAccess = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Set property: ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  });
};

 
const processData = (data) => {
  const uniqueItems = new Set(data.map(({ id }) => id));
  const dataMap = new Map();

  uniqueItems.forEach(id => {
    const itemData = data.filter(item => item.id === id);
    dataMap.set(id, itemData);
  });

  for (const [key, value] of dataMap) {
    print(`ID: ${key}, Count: ${value.length}`);
  }
};

 
const manipulateArray = (first, ...rest) => {
  const allItems = [first, ...rest];
  return `Processed ${allItems.length} items: ${allItems.join(', ')}`;
};

 
(async () => {
  const userUrl = 'https://jsonplaceholder.typicode.com/users';
  const data = await fetchData(userUrl).catch(err => console.error(err));
  if (data) {
    const loggedData = logAccess(data);
    processData(loggedData);
    print(manipulateArray(...loggedData.map(user => user.name)));
  }
})();
