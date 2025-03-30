 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(1000);  
  return { user: 'John Doe', age: 30 };
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property '${prop}'`);
      return target[prop];
    } else {
      console.warn(`Property '${prop}' not found`);
      return null;
    }
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
async function main() {
  try {
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);

     
    print(proxiedData.user);  
    print(proxiedData.age);  
    print(proxiedData.location);  

     
    proxiedData.age = 31;
    print(proxiedData.age);  
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
