 
const crypto = require('crypto');

 
async function generateRandomString(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

 
function timeExecution(fn) {
  return async function(...args) {
    console.time(fn.name);
    const result = await fn(...args);
    console.timeEnd(fn.name);
    return result;
  };
}

 
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const sampleObject = {
  foo: 'bar',
  num: 42
};

const proxiedObject = new Proxy(sampleObject, handler);

 
(async () => {
   
  const timedRandomString = timeExecution(generateRandomString);
  const randomString = await timedRandomString(16);
  print(`Generated random string: ${randomString}`);

   
  print(proxiedObject.foo);
  proxiedObject.foo = 'baz';
  print(proxiedObject.num);
})();
