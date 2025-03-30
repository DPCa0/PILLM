class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
  }

  unique() {
    return this.filter((item, index) => this.indexOf(item) === index);
  }

  async mapAsync(callback) {
    return Promise.all(this.map(callback));
  }

  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }
}

const processArray = async () => {
  const numbers = new EnhancedArray(1, 2, 2, 3, 4, 4, 5);

   
  const uniqueNumbers = numbers.unique();
  print('Unique Numbers:', uniqueNumbers);

   
  const squaredNumbers = await numbers.mapAsync(async num => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return num * num;
  });

  print('Squared Numbers:', squaredNumbers);

   
  print('First Number:', numbers.first);
  print('Last Number:', numbers.last);
};

processArray().catch(console.error);
