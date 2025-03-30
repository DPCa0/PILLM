 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'validURL') {
        resolve({ data: 'Sample Data' });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on target`);
      return null;
    }
  }
};

const dataProxy = new Proxy({ user: 'John Doe', age: 30 }, handler);

 
(async () => {
  try {
     
    const result = (await fetchData('validURL'))?.data ?? 'No Data Found';
    print('Fetched Data:', result);

     
    print('User:', dataProxy.user);
    print('Non-existent Property:', dataProxy.address);

     
    print(`User's age is ${dataProxy.age}`);

    // Use a Map for data storage
    const dataMap = new Map();
    dataMap.set('key1', 'value1');
    dataMap.set('key2', 'value2');

    // Use destructuring and spread syntax
    const [first, second] = dataMap.values();
    print('Map Values:', first, second);

    const dataArray = [...dataMap.keys()];
    print('Map Keys:', dataArray);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
