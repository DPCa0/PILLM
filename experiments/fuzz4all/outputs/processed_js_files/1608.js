 

 
function* counterGenerator() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

 
async function delayedIncrement(counter) {
  for await (let count of counter) {
    await new Promise((resolve) => setTimeout(resolve, 1000));  
    print(`Current Count: ${count}`);
    if (count >= 5) return;  
  }
}

 
const handler = {
  set(target, property, value) {
    print(`Setting value ${value} on property ${property}`);
    return Reflect.set(target, property, value);
  },
};

 
const observableCounter = new Proxy(counterGenerator(), handler);

 
delayedIncrement(observableCounter);
