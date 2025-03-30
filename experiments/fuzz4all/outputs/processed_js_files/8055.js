 
async function* asyncNumberGenerator(max) {
  let number = 0;
  while (number <= max) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield number++;
  }
}

 
const complexObject = new Proxy({ a: 1, b: 2 }, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} not found`;
  }
});

 
const uniqueSymbol = Symbol('unique');
complexObject[uniqueSymbol] = "I'm a unique property";

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i - 1];
    if (typeof value === 'number') {
      return result + string + value.toFixed(2);
    }
    return result + string + (value || '');
  });
}

const num = 42.123456;
print(tag`Number is: ${num}`);

 
(async () => {
  for await (const num of asyncNumberGenerator(5)) {
    print(`Number from generator: ${num}`);
  }

  print(complexObject.a);  
  print(complexObject.c);  
  print(complexObject[uniqueSymbol]);  
})();
