 
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'doubleNext') {
      return async function() {
        let { value, done } = await target.next();
        if (done) return { value: undefined, done: true };
        return { value: value * 2, done };
      }
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const proxiedAsyncGen = new Proxy(asyncGenerator(), handler);

 
(async () => {
  for await (const val of proxiedAsyncGen) {
    print(val);  
  }
  
  let doubled;
  
   
  doubled = await proxiedAsyncGen.doubleNext();
  print(doubled.value);  
  
   
  doubled = await proxiedAsyncGen.doubleNext();
  print(doubled.value);  
  
   
  doubled = await proxiedAsyncGen.doubleNext();
  print(doubled.value);  
})();
