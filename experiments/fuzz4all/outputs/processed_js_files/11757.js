 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
}

 
async function processData() {
  try {
    const result = await fetchData('https://api.example.com/data');
    print(result);

     
    const dataMap = new Map();
    dataMap.set('key1', 'value1');
    dataMap.set('key2', 'value2');

     
    const arr = ['apple', 'banana', 'cherry'];
    const newArr = [...arr, 'date', ...dataMap.values()];
    const [first, , third, ...rest] = newArr;

    print(`First: ${first}, Third: ${third}, Rest: ${rest.join(', ')}`);

     
    const handler = {
      get: (target, prop) => {
        return prop in target ? target[prop] : 'Property not found';
      },
    };
    const proxy = new Proxy(dataMap, handler);

    print(proxy.get('key1'));  
    print(proxy.get('nonexistentKey'));  
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
(async () => {
  await processData();
})();
