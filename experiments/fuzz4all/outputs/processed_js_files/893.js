class DataPipeline {
  constructor(data = []) {
    this.data = data;
  }
  
   
  mapWith(...fns) {
    this.data = this.data.map(item => fns.reduce((acc, fn) => fn(acc), item));
    return this;
  }
  
   
  async transformAsync(fn) {
    this.data = await Promise.all(this.data.map(async item => await fn(item)));
    return this;
  }
  
   
  *iterator() {
    for (const item of this.data) {
      yield item;
    }
  }

   
  static #privateLog(message) {
    print(`DataPipeline Log: ${message}`);
  }

  logData() {
    DataPipeline.#privateLog(`Current Data: ${JSON.stringify(this.data)}`);
  }
}

(async () => {
   
  const [a, b, ...rest] = [1, 2, 3, 4, 5];

   
  const pipeline = new DataPipeline([a, b, ...rest])
    .mapWith(x => x * 2, x => `Value: ${x}`)  
    .logData();

   
  await pipeline.transformAsync(async x => `${x} (Processed)`);

  pipeline.logData();

   
  for (const item of pipeline.iterator()) {
    print(item);
  }
})();
