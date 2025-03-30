 

 
const config = new Proxy({}, {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number' && value >= 0) {
      target[prop] = value;
      return true;
    }
    throw new TypeError(`Value for ${prop} must be a non-negative number`);
  }
});

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('URL is required');
      }
    }, 1000);
  });
};

 
(async () => {
  try {
    config.retryCount = 3;
    config.timeout = 2000;
    
    print(`Configuration:`, JSON.stringify(config));
    
    let data = await fetchData('https://api.example.com/data');
    print('Fetched Data:', data);
    
    data = await fetchData('');
    print('This line will not run due to the error above');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
