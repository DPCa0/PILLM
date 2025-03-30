 

 
async function* numberStream() {
  for (let i = 1; i <= 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === Symbol.asyncIterator) {
      return target[Symbol.asyncIterator].bind(target);
    }
    return Reflect.get(...arguments);
  },
  apply(target, thisArg, args) {
    print(`Calling function ${target.name} with arguments ${args}`);
    return Reflect.apply(...arguments);
  }
};

 
const proxiedNumberStream = new Proxy(numberStream, handler);

(async () => {
   
  for await (const num of proxiedNumberStream()) {
    print(`Received number: ${num}`);
  }
})();
