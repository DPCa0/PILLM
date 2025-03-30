 

 
const complexOperation = async () => {
   
  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'JavaScript Mastery' };
      resolve(data);
    }, 1000);
  });

   
  const { id, name } = await fetchData;

   
  const uniqueValues = new Set([...[1, 2, 3, 4, 4, 5, 1, 6]]);
  uniqueValues.add(id);

   
  const map = new Map();
  uniqueValues.forEach((value, index) => map.set(index, value));

   
  const proxyHandler = {
    get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} doesn't exist`)
  };
  const proxiedMap = new Proxy(map, proxyHandler);

  // Optional chaining and nullish coalescing operator
  print(`Fetched Data: ${name ?? 'No Name'}, Values: ${proxiedMap.get(10) ?? 'N/A'}`);
};

complexOperation().catch(error => console.error('Error:', error));
