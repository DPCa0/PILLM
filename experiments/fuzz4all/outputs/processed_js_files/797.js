 

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Get property ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property ${prop} does not exist.`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Set property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const reactiveObject = new Proxy({ count: 0 }, handler);

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
async function asyncFibonacci(limit) {
  const fibGen = fibonacci();
  for (let i = 0; i < limit; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    reactiveObject.count = fibGen.next().value;
    print(`Fibonacci number ${i + 1}: ${reactiveObject.count}`);
  }
}

 
asyncFibonacci(10);
