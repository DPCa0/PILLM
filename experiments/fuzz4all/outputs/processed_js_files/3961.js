class AsyncNumberGenerator {
  #max;
  
  constructor(max = 100) {
    this.#max = max;
  }

  async *generate() {
    for (let i = 0; i < this.#max; i++) {
      yield await new Promise(resolve => 
        setTimeout(() => resolve(i), Math.random() * 100)
      );
    }
  }
}

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

(async () => {
  const numGenerator = new AsyncNumberGenerator(10);
  const fib = fibonacci(10);
  
  const combinedGenerator = async function*() {
    const nums = numGenerator.generate();
    while (true) {
      const num = await nums.next();
      const fibNum = fib.next();
      
      if (num.done && fibNum.done) break;
      
      yield { asyncNum: num.value, fibNum: fibNum.value };
    }
  };

  for await (const pair of combinedGenerator()) {
    print(`AsyncNum: ${pair.asyncNum}, FibNum: ${pair.fibNum}`);
  }
})();
