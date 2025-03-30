 

const asyncFunction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("World");
    }, 1000);
  });
};

const generatorFunction = function* () {
  yield "Hello";
  const asyncResult = yield asyncFunction();
  yield asyncResult;
};

const proxyHandler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }
    return "Property does not exist";
  },
};

const complexObject = {
  message1: "Hello",
  message2: "World",
};

const proxy = new Proxy(complexObject, proxyHandler);

(async () => {
  const generator = generatorFunction();
  let result = generator.next();
  
  while (!result.done) {
    const value = await result.value;
    result = generator.next(value);
  }

  print(`${proxy[result.value]}!`);
})();
