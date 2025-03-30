 
class ComplexExample {
  constructor() {
    this.data = new Proxy([], {
      get(target, prop, receiver) {
        if (prop === 'length') {
          print('Accessing length property');
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value) {
        print(`Setting value ${value} at position ${prop}`);
        return Reflect.set(target, prop, value);
      }
    });
  }

   
  async fetchData() {
    print('Fetching data...');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.data.push(...[1, 2, 3, 4, 5]);
        print('Data fetched:', this.data);
        resolve(this.data);
      }, 1000);
    });
  }

   
  *dataGenerator() {
    for (let value of this.data) {
      yield value;
    }
  }

   
  async processData() {
    await this.fetchData();
    print('Processing data...');
    let gen = this.dataGenerator();
    for (let value of gen) {
      print('Processing value:', value);
    }
  }
}

 
const example = new ComplexExample();
example.processData();
