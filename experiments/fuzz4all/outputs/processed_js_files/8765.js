 

 
function* dataGenerator() {
  yield fetchData('https://api.example.com/data1');
  yield fetchData('https://api.example.com/data2');
  yield fetchData('https://api.example.com/data3');
}

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, Math.random() * 2000);
  });
}

 
async function handleData(generator) {
  const iterator = generator();

  const proxyHandler = {
    get: function (target, prop, receiver) {
      if (prop in target) {
        print(`Accessing ${prop} property`);
        return Reflect.get(target, prop, receiver);
      }
      return () => print(`No operation for ${prop}`);
    },
  };

  let result;
  do {
    result = iterator.next();
    if (!result.done) {
      const data = await result.value;
      const dataProxy = new Proxy({ data }, proxyHandler);
      print(dataProxy.data);
    }
  } while (!result.done);
}

 
handleData(dataGenerator);
