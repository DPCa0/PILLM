 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(`Data from ${url}`);
      } else {
        reject('Fetch error');
      }
    }, 1000);
  });
}

 
function createLoggingProxy(target) {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) {
        print(`Accessed property: ${prop}, value: ${obj[prop]}`);
        return obj[prop];
      }
      return undefined;
    },
  });
}

 
function* dataGenerator() {
  yield* ['Data 1', 'Data 2', 'Data 3'];
}

 
(async function main() {
  const url = 'https://api.example.com/data';

   
  const uniqueData = new Set();

   
  for (const data of dataGenerator()) {
    uniqueData.add(data);
  }

   
  try {
    const fetchedData = await fetchData(url);
    uniqueData.add(fetchedData);
    print('Fetched data successfully:', fetchedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const dataObject = {
    ...Array.from(uniqueData).reduce((acc, cur, idx) => {
      acc[`item${idx + 1}`] = cur;
      return acc;
    }, {}),
  };
  const proxyObject = createLoggingProxy(dataObject);

   
  print(proxyObject.item1);
  print(proxyObject.item2);
  print(proxyObject.nonExistentItem);

   
  print('Optional chaining:', proxyObject?.item3 ?? 'Default value');
})();
