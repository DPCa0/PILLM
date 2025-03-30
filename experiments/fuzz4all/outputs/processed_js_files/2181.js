 

 
async function* fetchData(urls) {
  for (const url of urls) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(`Data from ${url}`), 1000)
    );
  }
}

 
async function handleData(urls) {
  const dataHandler = {
    set(target, prop, value) {
      if (prop in target) {
        print(`Updating ${prop} to ${value}`);
        target[prop] = value;
        return true;
      } else {
        console.warn(`Cannot set ${prop} - doesn't exist`);
        return false;
      }
    },
  };

  const dataStore = new Proxy({}, dataHandler);

  const generator = fetchData(urls);
  for await (const promise of generator) {
    const data = await promise;
    const urlIndex = urls.indexOf(data.split(' ')[2]);
    Reflect.set(dataStore, `url${urlIndex}`, data);
  }
  
  return dataStore;
}

// Utility function to use generators and promises in a concise way
(async function main() {
  const urls = ['https: 
  const dataStore = await handleData(urls);
  print(dataStore);
})();
