 

 
const uniqueKey = Symbol('uniqueKey');

 
const handler = {
  get(target, prop) {
    print(`Getting property: ${String(prop)}`);
    return prop in target ? target[prop] : `Property ${String(prop)} not found`;
  },
  set(target, prop, value) {
    print(`Setting property: ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const obj = {
  name: 'JavaScript',
  [uniqueKey]: 'secret',
};

 
const proxyObj = new Proxy(obj, handler);

 
async function demonstrateProxy() {
  print(proxyObj.name);
  proxyObj.version = 'ES2023';
  print(proxyObj.version);
  print(proxyObj[uniqueKey]);
  print(proxyObj.nonExistentProperty);
}

 
(async () => {
  print('Starting demonstration:');
  await demonstrateProxy();
  print('Demonstration finished.');
})();
