 

 
async function fetchData(key) {
  const data = new Map([
    ['alpha', 'This is Alpha'],
    ['beta', 'This is Beta'],
    ['gamma', 'This is Gamma']
  ]);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.has(key)) {
        resolve(data.get(key));
      } else {
        reject('Key not found');
      }
    }, 1000);
  });
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing ${prop}...`);
      return Reflect.get(target, prop, receiver);
    }
    throw new ReferenceError(`Property ${prop} not found`);
  }
};

 
const dataHandler = {
  alpha: 'Alpha Data',
  beta: 'Beta Data',
  getData: async function (key) {
    try {
      const result = await fetchData(key);
      print(result);
    } catch (error) {
      console.error(error);
    }
  }
};

 
const proxiedDataHandler = new Proxy(dataHandler, handler);

 
(async () => {
  print(proxiedDataHandler.alpha);  
  await proxiedDataHandler.getData('beta');  
  try {
    print(proxiedDataHandler.delta);  
  } catch (e) {
    console.error(e);
  }
})();
