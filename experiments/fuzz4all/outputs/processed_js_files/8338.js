 

(async () => {
   
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [1, 2, 3], meta: { status: 200 } });
      }, 1000);
    });
  };

   
  const { data, meta: { status } } = await fetchData();

   
  const [first, ...rest] = data.map(num => num * 2);

   
  const handler = {
    get(target, prop) {
      print(`Accessed property ${prop}`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      print(`Setting property ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    }
  };

  const proxiedData = new Proxy({ first, rest, status }, handler);

   
  print(`Status: ${proxiedData.status}, First: ${proxiedData.first}, Rest: ${proxiedData.rest}`);
  proxiedData.first = 99;

   
  print(`Updated First: ${proxiedData.first}`);
})();
