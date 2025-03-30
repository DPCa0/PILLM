class AsyncChain {
  constructor(value) {
    this.value = Promise.resolve(value);
  }
  
  async then(fn) {
    const v = await this.value;
    this.value = fn(v);
    return this;
  }

  async catch(fn) {
    this.value = this.value.catch(fn);
    return this;
  }

  async finally(fn) {
    this.value = this.value.finally(fn);
    return this;
  }

  static start(value) {
    return new AsyncChain(value);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchData = async () => {
  await delay(1000);  
  if (Math.random() > 0.5) throw new Error('Random Error');
  return { data: 'some data' };
};

AsyncChain.start(fetchData())
  .then(data => {
    print('Data received:', data);
    return 'Processing data';
  })
  .then(processedData => {
    print(processedData);
    return delay(500).then(() => 'Data processed');
  })
  .then(final => {
    print(final);
  })
  .catch(error => {
    console.error('Error occurred:', error.message);
  })
  .finally(() => {
    print('Operation completed');
  });
