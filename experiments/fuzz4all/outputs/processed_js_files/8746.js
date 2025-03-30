 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncFibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    await delay(500);  
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const fibMap = new Map();
const proxiedFibMap = new Proxy(fibMap, handler);

(async () => {
  print("Generating Fibonacci sequence asynchronously...");
  
  for await (const num of asyncFibonacci(10)) {
    print(num);
    proxiedFibMap.set(num, `Fibonacci number: ${num}`);
  }

  print("Finished generating Fibonacci sequence.");
  print("Stored Fibonacci numbers in Map:", [...proxiedFibMap.keys()]);
})();
