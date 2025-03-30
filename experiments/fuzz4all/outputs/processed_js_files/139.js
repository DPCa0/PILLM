 

class AsyncOperation {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
  }

  async fetchData() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  }
}

function* dataProcessor(data) {
  for (let item of data) {
    yield item * 2;  
  }
}

const operation = new AsyncOperation();

async function handleData() {
  const proxyHandler = {
    get: (target, property) => {
      if (property in target) {
        return target[property];
      }
      return `No such property: ${property}`;
    },
  };

  const fetchedData = await operation.fetchData();
  const processedData = [];

  const proxy = new Proxy(fetchedData, proxyHandler);
  print(proxy[0]);  

  const iterator = dataProcessor(fetchedData);

  for (let value of iterator) {
    processedData.push(value);
  }

  print(processedData);  
  print(proxy.nonExistentProperty);  
}

handleData();
