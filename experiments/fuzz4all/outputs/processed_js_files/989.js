 

class ComplexDataHandler {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.map(item => item * 2));
      }, 1000);
    });
  }
}

const handlerProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop === 'data') {
        print('Accessing data property');
      }
      return obj[prop];
    }
  });
};

(async () => {
  const dataHandler = new ComplexDataHandler([1, 2, 3, 4, 5]);
  const proxiedHandler = handlerProxy(dataHandler);

  print('Original data:', proxiedHandler.data);
  
  const result = await proxiedHandler.processData();
  print('Processed data:', result);
})();
