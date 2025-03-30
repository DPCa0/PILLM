 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Complex Data" });
    }, 1000);
  });
};

function* dataGenerator() {
  yield "Initializing";
  const data = yield fetchData();
  yield `Received: ${data.data}`;
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      return "Property does not exist";
    }
  },
};

const complexObject = new Proxy({ foo: "bar" }, handler);

(async () => {
  print(complexObject.foo);  
  print(complexObject.missing);  

  const gen = dataGenerator();
  print(gen.next().value);  
  const promise = gen.next().value;
  const result = await promise;
  print(gen.next(result).value);  
})();
