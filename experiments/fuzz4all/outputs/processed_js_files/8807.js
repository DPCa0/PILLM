 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve(`Data from ${url}`) : reject('No URL provided');
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Set property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const dataStore = new Proxy({}, handler);

 
(async () => {
  try {
    const dataUrl = 'https://api.example.com/data';

     
    const result = await fetchData(dataUrl);
    print(result);

     
    const fetchedData = {
      details: {
        name: 'Sample Data'
      }
    };

    print(fetchedData?.details?.name ?? 'No name available');

     
    if (true) {   
      const { default: lodash } = await import('https://cdn.skypack.dev/lodash');
      const compacted = lodash.compact([0, 1, false, 2, '', 3]);
      print(compacted);
    }

     
    dataStore.content = result;

     
    print(dataStore.content);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
