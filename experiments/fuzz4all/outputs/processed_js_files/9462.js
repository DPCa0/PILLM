 

 
const secretKey = Symbol('secret');

const data = {
  publicInfo: 'This is public',
  [secretKey]: 'This is secret'
};

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'secret') {
      return `Access to secret denied`;
    }
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    if (prop === 'publicInfo') {
      Reflect.set(target, prop, `Updated: ${value}`);
      return true;
    }
    return Reflect.set(...arguments);
  }
};

 
const proxyData = new Proxy(data, handler);

 
async function* fetchData(ids) {
  for (const id of ids) {
    yield new Promise(resolve =>
      setTimeout(() => resolve(`Fetched data for ID: ${id}`), 1000)
    );
  }
}

 
(async () => {
  print(proxyData.publicInfo);   
  print(proxyData.secret);       

  proxyData.publicInfo = 'New public info';
  print(proxyData.publicInfo);   

  print(data[secretKey]);        

  for await (const result of fetchData([1, 2, 3])) {
    print(result);               
  }
})();
