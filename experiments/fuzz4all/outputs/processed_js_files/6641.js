 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
  const values = ["Hello", "from", "an", "async", "generator!"];
  for (const value of values) {
    await delay(500);
    yield value;
  }
}

 
const uniqueKey = Symbol('unique');

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === uniqueKey) {
      return "You found the unique key!";
    }
    return Reflect.get(...arguments);
  }
};

 
const obj = new Proxy({
  message: "This is a proxied object",
  [uniqueKey]: "You won't find this normally!"
}, handler);

 
(async () => {
  print(obj.message);
  print(obj[uniqueKey]);
  
  for await (const word of asyncGenerator()) {
    print(word);
  }
})();
