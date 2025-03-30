 
const createAsyncIterable = (elements) => ({
  [Symbol.asyncIterator]: async function* () {
    for (let element of elements) {
      await new Promise((resolve) => setTimeout(resolve, 1000));  
      yield element;
    }
  }
});

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

 
async function processFibonacci() {
  const asyncIterable = createAsyncIterable(fibonacci(10));
  for await (const num of asyncIterable) {
    print(`Fibonacci: ${num}`);
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} is not available`;
  }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
Reflect.set(obj, 'c', 3);

print(obj.a);   
print(obj.c);   
print(obj.z);   

 
(() => print(`The quick brown fox jumps over the lazy dog at ${new Date().toLocaleTimeString()}`))();

 
processFibonacci();
