 
const map = new Map([
  ['name', 'Alice'],
  ['age', 30],
  ['location', 'Wonderland']
]);

 
const handler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Method ${prop} called with arguments: ${JSON.stringify(args)}`);
        return target[prop].apply(target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxiedMap = new Proxy(map, handler);

 
async function* asyncGenerator() {
  let count = 0;
  while (count < 3) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield count++;
  }
}

 
(async () => {
  for await (const num of asyncGenerator()) {
    print(`Async Generator emitted: ${num}`);
    proxiedMap.set(`counter${num}`, num);
  }
  
   
  print(`Name: ${proxiedMap.get('name') ?? 'Unknown'}`);
  print(`Email: ${proxiedMap.get('email')?.toUpperCase() ?? 'No Email Provided'}`);
})();

 
const uniqueSymbol = Symbol('uniqueKey');
proxiedMap.set(uniqueSymbol, 'SymbolValue');
print(`Symbol Value: ${proxiedMap.get(uniqueSymbol)}`);
