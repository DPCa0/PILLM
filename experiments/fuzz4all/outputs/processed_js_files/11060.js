 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createAsyncGenerator = async function* (count) {
  let i = 0;
  while (i < count) {
    await delay(100);  
    yield i++;
  }
};

const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}" with value:`, target[prop]);
      return target[prop];
    }
    return `Property "${prop}" does not exist`;
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to value:`, value);
    target[prop] = value;
    return true;
  }
};

const runComplexProgram = async () => {
  const proxyObject = new Proxy({}, handler);
  
   
  proxyObject.foo = 'bar';
  proxyObject.count = 0;

   
  print(proxyObject.foo);
  
  for await (const num of createAsyncGenerator(5)) {
    print(`Async generator yielded: ${num}`);
    proxyObject.count = num;
    print(`Updated proxy count: ${proxyObject.count}`);
  }

   
  print(proxyObject.nonExistentProperty);
};

runComplexProgram();
