 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* delayedNumbers() {
  for (let i = 1; i <= 5; i++) {
    await delay(1000);  
    yield i;
  }
}

 
const target = { secret: 42 };
const handler = {
  get(obj, prop) {
    print(`Accessing property "${prop}"`);
    return obj[prop];
  },
  set(obj, prop, value) {
    print(`Setting property "${prop}" to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxiedObject = new Proxy(target, handler);

 
(async () => {
  const generator = delayedNumbers();
  
  print("Starting to retrieve numbers with delay:");
  for await (const number of generator) {
    print(`Received number: ${number}`);
  }

  print("\nWorking with Proxies:");
  print(`The secret is: ${proxiedObject.secret}`);
  proxiedObject.secret = 100;
  print(`Updated secret is: ${proxiedObject.secret}`);
})();
