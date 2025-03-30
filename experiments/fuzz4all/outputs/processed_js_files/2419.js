 
async function complexFeatureShowcase() {
   
  const set = new Set([1, 2, 3, 4, 5]);

   
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

   
  const array = [10, 20, 30];
  const [first, ...rest] = array;

   
  const targetObject = { name: 'Advanced JavaScript' };
  const handler = {
    get: (target, property) => {
      return property in target ? target[property] : `Property ${property} not found`;
    }
  };
  const proxy = new Proxy(targetObject, handler);

   
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data fetched successfully');
      }, 1000);
    });
  };

  try {
     
    const data = await fetchData();
    print(data);  

     
    const weakMap = new WeakMap();
    const keyObj = {};
    weakMap.set(keyObj, 'Private Data');

    print(`First: ${first}, Rest: ${rest}`);  
    print(`Set has 3: ${set.has(3)}`);  
    print(`Map value for 'a': ${map.get('a')}`);  
    print(`Proxy test: ${proxy.name}`);  
    print(`WeakMap private data: ${weakMap.get(keyObj)}`);  
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
complexFeatureShowcase();
