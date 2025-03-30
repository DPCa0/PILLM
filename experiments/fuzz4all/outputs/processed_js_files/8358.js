 
async function* generateSequence() {
  let i = 0;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve({ value: i++, done: false }), 1000));
  }
}

(async function processSequence() {
  for await (let { value, done } of generateSequence()) {
    if (done || value > 5) break;
    print(`Generated value: ${value}`);

    const promise = new Promise((resolve, reject) => {
      if (value % 2 === 0) {
        resolve(`Even number processed: ${value}`);
      } else {
        reject(`Odd number encountered: ${value}`);
      }
    });

    try {
      const message = await promise;
      print(message);
    } catch (error) {
      console.warn(error);
    }
  }
})();

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get(target, prop) {
    print(`Accessed property "${prop}" with value: ${target[prop]}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Modified property "${prop}" from ${target[prop]} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxyObject = new Proxy(targetObject, handler);

proxyObject.a;           
proxyObject.b = 42;      
proxyObject.c += 10;     
