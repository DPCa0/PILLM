 

 
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* generateSequence(start, end, delay) {
  for (let i = start; i <= end; i++) {
    await wait(delay);
    yield i;
  }
}

 
async function consumeGenerator() {
  print("Starting sequence...");
  const sequence = generateSequence(1, 5, 1000);

  for await (let value of sequence) {
    print(`Generated value: ${value}`);
    if (value === 3) {
      print("Special value encountered, taking action!");
       
      const handler = {
        get: function(target, prop) {
          if (prop === 'message') {
            return `Proxied Message: The number is ${target[prop]}`;
          }
          return Reflect.get(...arguments);
        }
      };
      
      const obj = { message: `The number is ${value}` };
      const proxy = new Proxy(obj, handler);
      print(proxy.message);
    }
  }
}

consumeGenerator();
