 
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'John Doe', active: true });
    }, 1000);
  });
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Getting ${prop}: ${obj[prop]}`);
      return obj[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    if (prop === 'active' && typeof value !== 'boolean') {
      throw new TypeError('Active must be a boolean.');
    }
    obj[prop] = value;
    return true;
  }
};

(async () => {
  try {
    const rawData = await getData();
    const proxyData = new Proxy(rawData, handler);
    
    print(proxyData.name);   

    proxyData.active = false;   
    print(proxyData.active);

    proxyData.active = 'yes';   
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
