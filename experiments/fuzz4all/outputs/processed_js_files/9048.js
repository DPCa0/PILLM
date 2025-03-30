 

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ id: 1, value: 'apple' }, { id: 2, value: 'banana' }, { id: 3, value: 'cherry' }]);
    }, 1000);
  });
}

 
const handler = {
  set: (target, key, value) => {
    if (value && typeof value === 'object') {
      print(`Setting ${key} with value ${value.value}`);
      target.set(key, value);
      return true;
    } else {
      throw new TypeError('Value must be an object');
    }
  }
};

 
(async () => {
  const dataMap = new Map();
  const proxyMap = new Proxy(dataMap, handler);

  try {
    const data = await fetchData();
    data.forEach(item => proxyMap[item.id] = item);

    proxyMap.forEach((value, key) => print(`Key: ${key}, Value: ${value.value}`));

     
    try {
      proxyMap[4] = 'not an object';  
    } catch (error) {
      console.error('Error:', error.message);
    }
  } catch (err) {
    console.error('Failed to fetch data:', err);
  }
})();
