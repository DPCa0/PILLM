 
async function* fibonacciGenerator() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const handler = {
  get(target, prop, receiver) {
    if (typeof prop === 'symbol' || isNaN(prop)) {
      return Reflect.get(target, prop, receiver);
    }
    let index = Number(prop);
    return (async () => {
      let iterator = target[Symbol.asyncIterator]();
      let result;
      for (let i = 0; i <= index; i++) {
        result = await iterator.next();
      }
      return result.value;
    })();
  }
};

const fibonacciSequence = new Proxy(fibonacciGenerator(), handler);

(async () => {
  print(await fibonacciSequence[0]);   
  print(await fibonacciSequence[5]);   
  print(await fibonacciSequence[10]);  
  print(await fibonacciSequence[15]);  
})();
