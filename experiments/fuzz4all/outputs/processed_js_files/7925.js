 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: 1, name: 'John Doe', balance: 100 });
    }, 1000);
  });
};

 
const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    } else {
      print(`Property ${prop} not found`);
      return null;
    }
  },
  set: (target, prop, value) => {
    if (prop === 'balance' && value < 0) {
      print("Negative balance not allowed.");
      return false;
    } else {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  },
};

 
const main = async () => {
  try {
    const userData = await fetchData();
    
     
    const userProxy = new Proxy(userData, proxyHandler);
    
     
    print(`Name: ${userProxy.name}`);
    
     
    userProxy.balance = 150;
    print(`Balance updated: ${userProxy.balance}`);
    
     
    userProxy.balance = -50;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

main();
