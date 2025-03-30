class ComplexOperation {
  constructor(iterations) {
    this.iterations = iterations;
  }

   
  *fibonacci() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.iterations; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  async execute() {
     
    const results = await Promise.all(
      [...this.fibonacci()].map(async (num, index) => {
         
        await new Promise((resolve) => setTimeout(resolve, 100 * index));
        return `Fib(${index + 1}): ${num}`;
      })
    );

     
    const handler = {
      get(target, prop) {
        if (typeof target[prop] === 'function') {
          return function(...args) {
            print(`Called method: ${prop}`);
            return target[prop].apply(target, args);
          };
        } else {
          return target[prop];
        }
      }
    };

    const proxiedResults = new Proxy(results, handler);
    proxiedResults.forEach(result => print(result));

     
    const uniqueResults = new Set(proxiedResults);
    print('Unique Results:', [...uniqueResults]);
  }
}

const operation = new ComplexOperation(10);
operation.execute();
