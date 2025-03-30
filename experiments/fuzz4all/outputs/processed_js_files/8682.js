 
function* numberGenerator(start = 0, end = 100, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

 
const target = { a: 1, b: 2, c: 3 };
const handler = {
  set(obj, prop, value) {
    print(`Property ${prop} set to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
async function asyncOperation() {
  print("Async operation started");
  return new Promise((resolve) => setTimeout(() => resolve("Operation complete"), 1000));
}

 
async function performOperations() {
  const results = await Promise.all([asyncOperation(), asyncOperation()]);
  print(results);
}

 
const { a, ...rest } = proxy;
print(`Destructured value a: ${a}`);
print("Rest of the properties:", rest);

 
(async () => {
  const module = await import('./someModule.js');
  print('Dynamic module loaded:', module);
})().catch(err => console.error("Failed to load module:", err));

 
const gen = numberGenerator(0, 10, 2);
for (const num of gen) {
  print(num);
}

 
proxy.b = 5;

 
performOperations();
