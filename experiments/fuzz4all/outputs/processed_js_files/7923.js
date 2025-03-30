 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
(async () => {
  try {
     
    const [first, second, third] = await fetchData();

     
    const uniqueItems = new Set([first, second, third, 'apple']);

     
    const metadata = new WeakMap();
    metadata.set({}, { source: 'api', length: uniqueItems.size });

     
    const gen = dataGenerator([...uniqueItems]);
    for (let item of gen) {
      print(`Item: ${item}`);
    }

     
    const handler = {
      get(target, prop) {
        print(`Accessing property '${prop}'`);
        return target[prop];
      }
    };
    
    const proxy = new Proxy(uniqueItems, handler);
    print(`Set has apple? ${proxy.has('apple')}`);

     
    const sourceInfo = metadata.get({})?.source ?? 'unknown';
    print(`Metadata source: ${sourceInfo}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
