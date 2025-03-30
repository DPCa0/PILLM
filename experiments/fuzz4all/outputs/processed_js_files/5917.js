class Matrix {
  constructor(data) {
    this.data = data;
  }

  static async fromArray(array) {
    return new Promise((resolve) => {
      const matrix = new Matrix(array);
      setTimeout(() => resolve(matrix), 500);  
    });
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  async *asyncIterator() {
    for (let row of this.data) {
      for (let cell of row) {
        await new Promise((res) => setTimeout(res, 100));  
        yield cell;
      }
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return this.data.map(row => row.join(',')).join('\n');
    }
    return this.data.length;
  }
}

 
(async () => {
  const matrix = await Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  print(`Matrix as string:\n${String(matrix)}`);
  print(`Matrix size: ${+matrix}`);

  print('Sync iteration:');
  for (let value of matrix) {
    print(value);
  }

  print('Async iteration:');
  for await (let value of matrix.asyncIterator()) {
    print(value);
  }
})();
