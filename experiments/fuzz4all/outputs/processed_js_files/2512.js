 

 
const target = { message: "Hello, world!" };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Property '${prop}' has been set to '${value}'`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
async function* messageGenerator() {
  const messages = ["Processing", "Please wait", "Almost there"];
  for (const msg of messages) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield msg;
  }
  yield proxy.message;
}

 
(async () => {
  const gen = messageGenerator();
  for await (const msg of gen) {
    print(msg);
  }
  
   
  proxy.message = "Goodbye, world!";
  print(proxy.message);
})();
