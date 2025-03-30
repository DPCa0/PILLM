 
 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url === 'valid') {
      resolve(['data1', 'data2', 'data3']);
    } else {
      reject('Invalid URL');
    }
  }, 1000);
});

 
async function getData(url) {
  try {
    const data = await fetchData(url);
    print('Data fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function* processData(data) {
  for (const item of data) {
    yield item.toUpperCase();
  }
}

 
const dataHandler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} with value: ${value}`);
    target[property] = value;
    return true;
  }
};

(async () => {
  const url = 'valid';
  const rawData = await getData(url);

  if (rawData) {
    const proxyData = new Proxy(rawData, dataHandler);

     
    const generator = processData(proxyData);
    for (const processed of generator) {
      print('Processed item:', processed);
    }

     
    print('First item:', proxyData[0]);
    proxyData[1] = 'NEW_DATA';
    print('Updated data:', proxyData);
  }
})();
