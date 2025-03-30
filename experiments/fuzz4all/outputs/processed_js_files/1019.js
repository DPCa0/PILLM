 
async function* asyncFibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    await new Promise(res => setTimeout(res, 100));  
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Accessed property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Set property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
const complexObject = {
  data: {
    value: 42
  },
  method() {
    print("Original method execution");
  }
};

 
const proxiedObject = new Proxy(complexObject, loggingHandler);

 
const { data: { value: fibLimit = 10 } } = proxiedObject;

 
(async () => {
  print("Fibonacci sequence:");
  for await (const num of asyncFibonacci(fibLimit)) {
    print(num);
  }

   
  proxiedObject.data.value = 100;   
  print(proxiedObject.data.value);   
  proxiedObject.method();   
})();
