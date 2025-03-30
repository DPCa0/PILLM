class ComplexFeatureDemo {
  #privateVar = 'Secret';
  
  constructor() {
    this.state = { count: 0, data: [1, 2, 3] };
  }

  *numberGenerator() {
    let i = 1;
    while (true) yield i++;
  }

  static async fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  proxyHandler() {
    return {
      get: (target, prop) => {
        if (prop === 'secret') {
          return 'Access Denied';
        }
        return Reflect.get(...arguments);
      }
    };
  }

  manipulateData(callback) {
    return new Promise((resolve, reject) => {
      try {
        const updatedData = this.state.data.map(callback);
        resolve(updatedData);
      } catch (error) {
        reject(error);
      }
    });
  }

  async execute() {
    const proxy = new Proxy(this, this.proxyHandler());
    print('Private access attempt:', proxy.#privateVar);

    const generator = this.numberGenerator();
    print('Generated number:', generator.next().value);

    const postData = await ComplexFeatureDemo.fetchData();
    print('Fetched data:', postData);

    const manipulatedData = await this.manipulateData(num => num * 2);
    print('Manipulated data:', manipulatedData);
  }
}

(new ComplexFeatureDemo()).execute();
