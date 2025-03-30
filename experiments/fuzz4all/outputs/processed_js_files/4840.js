 

 
const target = { message: "Hello", language: "JavaScript" };
const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return Reflect.get(obj, prop);
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
};
const proxy = new Proxy(target, handler);

 
function* messageGenerator() {
  yield `${proxy.message}, world!`;
  yield `Welcome to ${proxy.language}.`;
}

 
async function asyncGeneratorHandler(gen) {
  for (let message of gen) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(message);
  }
}

 
proxy.message = "Hi";
proxy.language = "ECMAScript";

 
(async () => {
  const gen = messageGenerator();
  await asyncGeneratorHandler(gen);
})();
