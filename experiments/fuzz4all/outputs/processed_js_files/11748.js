 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Sample Data', status: 200 });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
async function loadData() {
  try {
    const response = await fetchData('https://api.example.com/data');
    print('Data fetched:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

 
const handler = {
  get: function(target, property) {
    print(`Property "${property}" accessed.`);
    return target[property];
  }
};

const targetObj = { hello: 'world', foo: 'bar' };
const proxyObj = new Proxy(targetObj, handler);

 
const showProxyData = () => {
  const { hello, foo } = proxyObj;
  print(`Proxy Data - Hello: ${hello}, Foo: ${foo}`);
};

 
loadData().then(() => showProxyData());
