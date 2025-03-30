 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'getUpperCased') {
      return () => target.map(item => item.toUpperCase());
    }
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting value of ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
(async () => {
  try {
    print("Fetching data...");
    const data = await fetchData();
    
    const proxyData = new Proxy(data, handler);
    
    print("Original Data:", proxyData);
    print("Upper Cased Data:", proxyData.getUpperCased());
    
    proxyData.push('date');
    print("Modified Data:", proxyData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
