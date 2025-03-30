 

class DataHandler {
  constructor(data) {
    this.data = data;
  }

  async *fetchData() {
    for (let item of this.data) {
      yield await this.simulateNetworkDelay(item);
    }
  }

  simulateNetworkDelay(item) {
    return new Promise(resolve => {
      setTimeout(() => resolve(`Processed: ${item}`), Math.random() * 1000);
    });
  }
}

const dataProxy = new Proxy([], {
  set(target, property, value) {
    if (typeof value === 'string') {
      print(`Adding: ${value}`);
      target[property] = value;
      return true;
    } else {
      throw new Error('Only strings are allowed');
    }
  }
});

dataProxy.push('Task 1');
dataProxy.push('Task 2');
dataProxy.push('Task 3');

const handler = new DataHandler(dataProxy);

(async () => {
  for await (const result of handler.fetchData()) {
    print(result);
  }
})();
