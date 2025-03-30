class ComplexOperation {
  #data = [];

  constructor(size) {
    this.#data = Array.from({ length: size }, () => Math.random());
  }

  async processData(callback) {
    let results = await Promise.all(this.#data.map(async (num) => {
      await new Promise(res => setTimeout(res, Math.random() * 100));  
      return callback(num);
    }));
    return results.reduce((acc, val) => acc + val, 0);
  }

  static async execute() {
    const operation = new ComplexOperation(10);

     
    const proxyHandler = {
      get(target, prop) {
        if (prop === 'processData') {
          return async (...args) => {
            print('Before processing');
            const result = await target[prop](...args);
            print('After processing');
            return result;
          };
        }
        return target[prop];
      }
    };

    const proxiedOperation = new Proxy(operation, proxyHandler);
    const result = await proxiedOperation.processData(num => num * 2);

    print(`Final Result: ${result}`);
  }
}

ComplexOperation.execute().catch(err => console.error(err));
