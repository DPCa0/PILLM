 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
function* processData(data) {
  for (let item of data) {
    yield item * 2;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return target[property];
  },
};

 
const main = async () => {
  try {
     
    const response = await fetchData('https://api.example.com/data');
    
     
    const proxyData = new Proxy(response.data, handler);
    
     
    const generator = processData(proxyData);

     
    for (let value of generator) {
      print(value);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
main();
