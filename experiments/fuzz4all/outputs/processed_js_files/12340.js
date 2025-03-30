 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* asyncCounter(limit) {
  for (let i = 1; i <= limit; i++) {
    await delay(1000);  
    yield i;
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return Reflect.get(...arguments);
    }
    return undefined;
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

 
const data = { greeting: 'Hello', subject: 'World' };

 
const proxiedData = new Proxy(data, handler);

 
async function advancedFeatureDemo() {
  const counter = asyncCounter(3);
  
   
  for await (const num of counter) {
    print(`Async Counter: ${num}`);
  }
  
   
  print(proxiedData.greeting);  
  proxiedData.subject = 'JavaScript';  

  print(`${proxiedData.greeting}, ${proxiedData.subject}!`);  
}

 
advancedFeatureDemo();
