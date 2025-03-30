 

 
const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `Item ${id}`, value: Math.floor(Math.random() * 100) });
    }, 1000);
  });
};

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property '${prop}':`, target[prop]);
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property '${prop}' not found`);
      return undefined;
    }
  },
};

 
(async () => {
   
  const ids = [1, 2, 3, 4, 5];

   
  const data = await Promise.all(ids.map(id => fetchData(id)));

   
  const [firstItem, secondItem, ...restItems] = data;
  
  print('First Item:', firstItem);
  print('Second Item:', secondItem);

   
  print('Rest of Items:', restItems);

   
  const proxyData = new Proxy(data, handler);

   
  print('Proxy access - third item:', proxyData[2]);
  print('Proxy access - non-existent item:', proxyData[10]);

})();
