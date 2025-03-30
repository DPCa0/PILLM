 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(1000);
  return { name: "Alice", age: 30 };
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property ${prop} does not exist.`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const userInfo = new Map();

async function main() {
  const data = await fetchData();
  const userProxy = new Proxy(data, handler);

   
  print(userProxy.name);   
  userProxy.age = 31;            

   
  userInfo.set(userProxy.name, userProxy);
  
  if (userInfo.has('Alice')) {
    const user = userInfo.get('Alice');
    print(`User retrieved from Map: ${user.name}, ${user.age}`);
  }
}

main();
