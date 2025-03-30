 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const obj = new Proxy({}, handler);

 
(async () => {
  if (Math.random() > 0.5) {
    const { sayHello } = await import('./module.js');
    sayHello();
  } else {
    print("Module not loaded this time");
  }
})();

 
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    [a, b] = [b, a + b];
    yield a;
  }
}

const fib = fibonacci();
print(fib.next().value);  
print(fib.next().value);  
print(fib.next().value);  

 
const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield i;
    }
  }
};

(async () => {
  for await (const num of asyncIterable) {
    print(num);  
  }
})();

 
const map = new Map([
  ['name', 'Alice'],
  ['age', 25]
]);

for (let [key, value] of map) {
  print(`${key}: ${value}`);
}

 
const sum = (...nums) => nums.reduce((acc, num) => acc + num, 0);
print(sum(1, 2, 3, 4, 5));  

const originalArray = [1, 2, 3];
const clonedArray = [...originalArray, 4, 5];
print(clonedArray);  

Note: For the dynamic import example to work