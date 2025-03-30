 

 
const handler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
const asyncOperation = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Operation Complete'), 2000);
  });

  const result = await promise;
  print(result);
};

 
const modifyObject = ({ a, b, ...rest }) => {
  return { a: a + 1, b: b + 1, ...rest };
};

 
(async () => {
  obj.a = 3;
  print(obj.b);
  
  const original = { a: 5, b: 10, c: 15 };
  const modified = modifyObject(original);
  print(modified);
  
  await asyncOperation();
})();
