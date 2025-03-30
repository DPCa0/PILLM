 

 
async function fetchData(url) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
function* processData(data) {
  for (const item of data) {
    yield item * 2;
  }
}

 
const handler = {
  get: function (obj, prop) {
    print(`Accessing property "${prop}"`);
    return obj[prop];
  },
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const { data } = await fetchData(url);  

    print('Fetched data:', data);

     
    const processedData = [];
    const generator = processData(data);

    for (const value of generator) {
      processedData.push(value);
    }

    print('Processed data:', processedData);

     
    print('Proxy object:', proxy.a, proxy.b);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
})();
