 

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property: ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`Setting property: ${String(prop)} = ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const privateProp = Symbol('private');

 
const target = {
  [privateProp]: 'secret',
  publicProp: 'accessible'
};

 
const proxiedObject = new Proxy(target, handler);

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fetched Data');
    }, 2000);
  });
}

 
(async function main() {
   
  print(proxiedObject.publicProp);  
  proxiedObject.publicProp = 'new value';  

   
  print(target[privateProp]); 

   
  print('Fetching...');
  const data = await fetchData();
  print(data);

   
  const sym1 = Symbol('unique');
  const sym2 = Symbol('unique');

  print(sym1 === sym2);  

})();
