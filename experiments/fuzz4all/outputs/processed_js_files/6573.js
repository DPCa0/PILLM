class AsyncFlow {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
  }

  async fetchData() {
     
    return new Promise((resolve) => setTimeout(() => resolve(this.data), 1000));
  }

  processData(data) {
     
    const [first, ...rest] = data.map(x => x * 2).filter(x => x > 4);
    return { first, rest };
  }

  async *asyncGenerator(data) {
    for (const item of data) {
      yield await new Promise(resolve => setTimeout(() => resolve(item), 500));
    }
  }

  async run() {
     
    const data = await this.fetchData() ?? [];
    const { first, rest } = this.processData(data) || {};

    print('First Item:', first);
    print('Rest:', rest);

     
    print('Async Generation Start');
    for await (const item of this.asyncGenerator(data)) {
      print('Generated Item:', item);
    }
    print('Async Generation End');
  }
}

 
(async () => {
  const flow = new AsyncFlow();
  await flow.run();
})();
