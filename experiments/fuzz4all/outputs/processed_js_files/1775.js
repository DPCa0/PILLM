 

 
const sym = Symbol('asyncData');

 
const handler = {
  get(target, prop, receiver) {
     
    print(`Accessing property: ${String(prop)}`);
    
     
    if (prop === sym) {
      return new Promise((resolve, reject) => {
         
        setTimeout(() => {
          const data = target[prop];
          if (data) resolve(data);
          else reject('No async data found');
        }, 1000);
      });
    }
    
     
    return Reflect.get(...arguments);
  }
};

 
const obj = {
  [sym]: 'Here is some async data!',
  normalProp: 'Just a normal property'
};

 
const proxyObj = new Proxy(obj, handler);

 
async function demonstrate() {
  print(proxyObj.normalProp);

  try {
     
    const asyncData = await proxyObj[sym];
    print(`Async Data: ${asyncData}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
demonstrate();
