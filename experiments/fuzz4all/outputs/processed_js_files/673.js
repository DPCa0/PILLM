 
const asyncRange = {
  start: 1,
  end: 10,
  [Symbol.asyncIterator]() {
    let current = this.start;
    return {
      next: () => new Promise((resolve) => {
        setTimeout(() => {
          if (current <= this.end) {
            resolve({ value: current++, done: false });
          } else {
            resolve({ done: true });
          }
        }, 100);  
      })
    };
  }
};

 
const targetObj = { prop1: 'value1', prop2: 'value2' };
const handler = {
  get: (obj, prop) => {
    print(`Accessed property: ${prop}`);
    return prop in obj ? obj[prop] : 'default';
  }
};
const proxiedObj = new Proxy(targetObj, handler);

 
const { prop1, prop3 = 'defaultVal', ...rest } = proxiedObj;

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');
}

(async function() {
   
  for await (const num of asyncRange) {
    print(`Async range value: ${num}`);
  }

   
  print(`Proxied property: ${prop1}, Defaulted property: ${prop3}`);

   
  const message = tag`Proxied values are: ${prop1}, ${prop3}, ${rest.prop2}`;
  print(message);
})();
