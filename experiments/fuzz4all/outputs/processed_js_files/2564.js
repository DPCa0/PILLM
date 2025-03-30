 

 
const uniqueKey = Symbol('unique');

const myObj = {
  [uniqueKey]: "This is a unique property",
  regularProp: "Hello"
};

 
const handler = {
  get: function(target, property, receiver) {
    if (property === 'secret') {
      return `The secret is: ${target[property]}`;
    }
    return Reflect.get(...arguments);
  }
};

const proxyObj = new Proxy({ secret: "12345", regular: "test" }, handler);

 
function* generateSequence() {
  yield 'First';
  yield 'Second';
  yield 'Third';
}

const generator = generateSequence();

 
async function asyncOperation() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Async operation complete!'), 1000);
  });

  const result = await promise;
  print(result);
}

 
(async function() {
  print('Symbol Example:', myObj[uniqueKey]);
  print('Proxy Example:', proxyObj.secret);
  
  print('Generator Example:');
  for (let value of generator) {
    print(value);
  }
  
  print('Async/Await Example:');
  await asyncOperation();
})();
