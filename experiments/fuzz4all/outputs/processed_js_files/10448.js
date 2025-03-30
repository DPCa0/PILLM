 

 
function* generateNumbers(limit) {
  let i = 0;
  while (i < limit) {
    yield i++ * (yield 'Multiply by:');
  }
}

 
const handler = {
  get(target, prop) {
    if (prop === 'complexOperation') {
      return target[prop];
    }
    if (typeof target[prop] === 'function') {
      return function (...args) {
        return target[prop].apply(target, args);
      };
    }
    throw new Error(`Property ${prop} is not accessible.`);
  },
  set(target, prop, value) {
    if (prop === 'complexOperation' && typeof value === 'function') {
      target[prop] = value;
      return true;
    }
    throw new Error(`Cannot set property ${prop}.`);
  },
};

 
const complexObject = {
  complexOperation: async function (num) {
    const generator = generateNumbers(num);
    let result;
    for (let step of generator) {
      const factor = await new Promise((resolve) =>
        setTimeout(() => resolve(2), 1000)
      );  
      result = generator.next(factor).value;
      print(`Result: ${result}`);
    }
    return result;
  },
};

 
const proxyComplexObject = new Proxy(complexObject, handler);

 
(async () => {
  try {
    const finalResult = await proxyComplexObject.complexOperation(5);
    print(`Final Result: ${finalResult}`);
  } catch (error) {
    console.error(error.message);
  }
})();
