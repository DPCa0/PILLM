 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]);
    }, 1000);
  });
}

 
const handler = {
  get: function(target, property) {
    print(`Accessing property ${property}`);
    return target[property];
  }
};

 
function processData(data, fn) {
  return data.map(fn);
}

 
const advancedOperation = async () => {
  try {
     
    const data = await fetchData();

     
    const proxyData = new Proxy(data, handler);

     
    const [first, second, ...rest] = proxyData;
    
     
    const squaredData = processData([first, second, ...rest], x => x ** 2);
    
     
    print(`Original data: ${data}`);
    print(`Squared data: ${squaredData}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

 
advancedOperation();
