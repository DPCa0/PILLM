 

const fetchData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4], meta: { count: 4 } });
    }, 1000);
  });
};

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    throw new Error(`Property ${prop} not found`);
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      target[prop] = value;
      return true;
    }
    throw new Error(`Only numbers are allowed`);
  }
};

(async () => {
  try {
    const { data, meta } = await fetchData();
    
    print(`Fetched ${meta.count} items`);
    
    const numbers = new Proxy(data, handler);
    
    numbers.push(5);  
    print(`Updated numbers: ${numbers}`);
    
     
     
    
    print(`Numbers sum: ${numbers.reduce((sum, num) => sum + num, 0)}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
