 

 
const target = { language: 'JavaScript' };
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
const observed = new Proxy(target, handler);

 
function* greetGenerator() {
  yield 'Hello,';
  yield 'world!';
}

async function asyncGreet(generator) {
  for (const word of generator()) {
    await new Promise(resolve => setTimeout(resolve, 500));
    print(word);
  }
}

 
const sym = Symbol('unique');
const obj = {
  [sym]: 'This is a unique symbol property',
  logSymbol() {
    print(this[sym]);
  }
};

 
(async () => {
  if (!observed.module) {
    const module = await import('./someModule.js');
    observed.module = module.default;
  }
  observed.module.run();
})();

 
observed.language = 'Advanced JavaScript';
print(observed.language);
asyncGreet(greetGenerator);
obj.logSymbol();
