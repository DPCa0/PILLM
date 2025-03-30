 

class ComplexFeatureDemo {
  constructor(data) {
    this.data = data;
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.data, 4, 5, 6]);
      }, 1000);
    });
  }

  static *dataGenerator(dataArray) {
    for (const item of dataArray) {
      yield item;
    }
  }

  async processData() {
    const fetchedData = await this.fetchData();
    const generator = ComplexFeatureDemo.dataGenerator(fetchedData);

    let { done, value } = generator.next();
    while (!done) {
      print(`Processing value: ${value}`);
      ({ done, value } = generator.next());
    }

    const [first, second, ...rest] = fetchedData;
    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
  }
}

const demo = new ComplexFeatureDemo([1, 2, 3]);
demo.processData().then(() => print('Data processing complete.'));
