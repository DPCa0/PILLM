class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
  }
  
  async processItems(callback) {
    const results = await Promise.all(this.map(item => callback(item)));
    return new EnhancedArray(...results);
  }
  
  filterUnique() {
    return this.filter((item, index) => this.indexOf(item) === index);
  }
}

const simulateAsyncOperation = (item) => new Promise(resolve => {
  setTimeout(() => resolve(item * 2), 1000);
});

(async () => {
  const arr = new EnhancedArray(1, 2, 3, 2, 4, 5, 3);
  
  const processedArr = await arr.processItems(simulateAsyncOperation);
  const uniqueArr = processedArr.filterUnique();
  
  print('Processed Array:', processedArr);
  print('Unique Array:', uniqueArr);
})();
