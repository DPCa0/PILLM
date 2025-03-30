Certainly! Here's a complex JavaScript program utilizing advanced features:

// Using async/await, Promises, and Proxy
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate network delay
      if (url === 'https: 
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('404 Not Found'));
      }
    }, 1000);
  });
}

const handler = {
  get(target, prop, receiver) {
    print(`Getting the property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`Setting the property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  }
};

const createObservableObject = (obj) => new Proxy(obj, handler);

(async function() {
  try {
    const apiResponse = await fetchData('https://api.example.com/data');
    const dataProxy = createObservableObject(apiResponse.data);

     
    print(dataProxy[0]);   
    dataProxy.push(6);           
    dataProxy[1] = 20;           

     
    async function* asyncGenerator(array) {
      for (const item of array) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield item * 2;   
      }
    }

    for await (const num of asyncGenerator(dataProxy)) {
      print(num);   
    }

  } catch (error) {
    console.error(error.message);
  }
})();

This program demonstrates asynchronous programming with async/await and Promises, uses a Proxy for observable property access and modifications, and includes an async generator function combined with a `for-await-of` loop.