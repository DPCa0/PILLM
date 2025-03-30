 

class AsyncArrayProcessor {
  constructor(array) {
    this.array = array;
  }

  async processArray() {
    try {
      const doubled = await this.doubleArrayValues(this.array);
      const filtered = doubled.filter((num) => num % 2 === 0);
      const sum = filtered.reduce((acc, val) => acc + val, 0);
      return sum;
    } catch (error) {
      throw new Error('Error processing array: ' + error);
    }
  }

  doubleArrayValues(arr) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(arr)) {
        reject('Input is not an array');
      } else {
        const doubled = arr.map((num) => num * 2);
        resolve(doubled);
      }
    });
  }
}

(async () => {
  try {
    const processor = new AsyncArrayProcessor([1, 2, 3, 4, 5]);
    const result = await processor.processArray();
    print('The sum of doubled even numbers is:', result);
  } catch (error) {
    console.error(error.message);
  }
})();
