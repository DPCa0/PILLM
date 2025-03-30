 
const randomTimeout = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

 
async function* asyncNumberGenerator() {
  let i = 0;
  while (true) {
    await randomTimeout();  
    yield i++;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting value of ${property}: ${target[property]}`);
      return target[property];
    } else {
      console.warn(`Property ${property} not found`);
      return undefined;
    }
  },
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.a);
print(proxyObject.b);
print(proxyObject.c);

 
const map = new Map([['apple', 1], ['banana', 2], ['cherry', 3]]);
const filteredMap = new Map(
  [...map].filter(([, value]) => value > 1)
);

print('Filtered Map:', filteredMap);

 
(async () => {
  const { value: firstValue } = await asyncNumberGenerator().next();
  const { value: secondValue } = await asyncNumberGenerator().next();
  print('Generated Numbers:', firstValue, secondValue);

   
  const array = [1, 2, 3, 4];
  const [first, , third] = array;
  print('First and Third:', first, third);

  const obj = { x: 10, y: 20, z: 30 };
  const { x, z } = obj;
  print('Destructured Object:', x, z);
})();
