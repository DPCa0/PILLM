 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ user: 'Alice', balance: 1500 });
    }, 1000);
  });
}

 
const handler = {
  get: (target, property) => {
    print(`Getting the property "${property}"`);
    return property in target ? target[property] : 'Property not found';
  },
  set: (target, property, value) => {
    if (property === 'balance' && typeof value !== 'number') {
      throw new TypeError('Balance must be a number');
    }
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
async function handleData() {
  try {
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);
    
    print(proxiedData.user);   
    proxiedData.balance = 2000;      
    
    print(proxiedData.balance);  
  } catch (error) {
    console.error('Error:', error.message);
  }
}

handleData();
