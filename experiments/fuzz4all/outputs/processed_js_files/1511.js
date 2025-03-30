class AsyncArray {
  constructor(arr = []) {
    this.arr = arr;
  }

  async mapAsync(callback) {
    return Promise.all(this.arr.map(callback));
  }

  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: async () => {
        if (index < this.arr.length) {
          const value = await Promise.resolve(this.arr[index]);
          index++;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

const asyncFunc = async () => {
  const asyncArray = new AsyncArray([1, 2, 3, 4, 5]);
  
  const newArray = await asyncArray.mapAsync(async num => {
    return num * num;
  });
  
  print('Mapped Array:', newArray);
  
  print('Iterating asynchronously:');
  for await (const num of asyncArray) {
    print(num);
  }
};

asyncFunc().catch(console.error);
