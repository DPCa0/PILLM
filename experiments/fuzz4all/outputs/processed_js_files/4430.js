class AsyncRange {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  async *[Symbol.asyncIterator]() {
    for (let i = this.start; i <= this.end; i += this.step) {
       
      await new Promise(resolve => setTimeout(resolve, 100));
      yield i;
    }
  }
}

(async function() {
  const range = new AsyncRange(1, 5);

  const results = await Promise.all(
    Array.from(range, async (val) => {
      const squared = await (async (x) => x * x)(val);
      return { original: val, squared };
    })
  );

  const mapped = results.map(({ original, squared }) => ({
    [original]: squared
  }));

  print(mapped);

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessing property ${prop}`);
        return target[prop];
      } else {
        return `Property ${prop} does not exist`;
      }
    }
  };

  const proxiedResult = new Proxy(mapped, handler);

  print(proxiedResult[0]);  
  print(proxiedResult[10]);  
})();
