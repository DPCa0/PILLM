 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function asyncOperation() {
  print("Starting async operation...");
  await delay(1000);
  print("Async operation complete!");
}

 
function* numberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObject = { name: "ProxyTarget", value: 42 };
const proxy = new Proxy(targetObject, handler);

 
(async function main() {
   
  await asyncOperation();

   
  print("Generated numbers:");
  const gen = numberGenerator(3);
  for (let num of gen) {
    print(num);
  }

   
  print("Proxy interactions:");
  print(proxy.name);
  proxy.value = 100;
  print(proxy.value);
})();
