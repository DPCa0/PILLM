class AsyncDataHandler {
  #secretKey = Symbol('secret');

  constructor() {
    this.data = new Map();
    this.operations = [
      this.#complexTransform1,
      this.#complexTransform2,
      this.#complexTransform3,
    ];
  }

  async fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();
    this.data.set(url, result);
    return this.#processData(url);
  }

  async #processData(url) {
    let data = this.data.get(url);
    for (const op of this.operations) {
      data = await op.call(this, data);
    }
    return data;
  }

  #complexTransform1(data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data.map(item => ({ ...item, processed: true }))), 100);
    });
  }

  #complexTransform2(data) {
    return data.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }

  async #complexTransform3(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.values(data).filter(item => item.processed));
      }, 100);
    });
  }

  [this.#secretKey]() {
    print('This is a secret method!');
  }
}

 
(async () => {
  const handler = new AsyncDataHandler();
  const processedData = await handler.fetchData('https://jsonplaceholder.typicode.com/posts');
  print(processedData);

   
  handler[handler.#secretKey]?.();
})();
