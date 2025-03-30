class AsyncResource {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const result = await this.fetchData(this.data);
      print('Processed Data:', result);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  fetchData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        data ? resolve(data.toUpperCase()) : reject('No data provided');
      }, 1000);
    });
  }
}

const dataProxyHandler = {
  set(target, key, value) {
    if (typeof value === 'string' && value.length > 5) {
      target[key] = value;
    } else {
      console.error('Data must be a string longer than 5 characters');
    }
    return true;
  },
  get(target, key) {
    return key in target ? target[key] : 'Default Data';
  },
};

const initialData = { value: 'Hello' };
const dataProxy = new Proxy(initialData, dataProxyHandler);

dataProxy.value = 'Hello World';

(async function () {
  if (dataProxy.value !== 'Default Data') {
    const resource = new AsyncResource(dataProxy.value);
    await resource.processData();
  }
})();
