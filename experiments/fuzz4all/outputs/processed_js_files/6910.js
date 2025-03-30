 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncNumberGenerator() {
  for (let i = 0; i < 5; i++) {
    await delay(500);
    yield i;
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop === Symbol.iterator) {
      return function* () {
        const numbers = [];
        for (let num of target) {
          numbers.push(num * 2);  
        }
        yield* numbers;
      };
    }
    return Reflect.get(...arguments);
  }
};

(async () => {
  const numbers = [];
  for await (const num of asyncNumberGenerator()) {
    numbers.push(num);
  }

  const proxiedNumbers = new Proxy(numbers, handler);

  print("Doubled numbers from async generator:");
  for (let num of proxiedNumbers) {
    print(num);  
  }
})();
