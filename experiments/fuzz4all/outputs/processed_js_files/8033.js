class AdvancedFeatureDemo {
  constructor() {
    this.data = [10, 20, 30, 40, 50];
  }
  
  async *asyncGenerator() {
    for (let num of this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield num;
    }
  }

  #privateMethod(num) {
    return num * 2;
  }

  transformData() {
    return this.data.map(num => this.#privateMethod(num));
  }

  async processAsyncData() {
    const results = [];
    for await (let num of this.asyncGenerator()) {
      results.push(num);
    }
    return results;
  }
}

const demo = new AdvancedFeatureDemo();

 
Promise.all([
  demo.processAsyncData(),
  new Promise(resolve => {
    setTimeout(() => resolve(demo.transformData()), 500);
  })
]).then(([asyncResult, transformedData]) => {
  print('Async Data:', asyncResult);
  print('Transformed Data:', transformedData);
});
