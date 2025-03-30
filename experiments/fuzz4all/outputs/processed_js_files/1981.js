class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr.map(row => [...row]));
  }

  get(row, col) {
    return this.data[row][col];
  }

  set(row, col, value) {
    this.data[row][col] = value;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      for (let value of row) {
        yield value;
      }
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return this.data.map(row => row.join(', ')).join('\n');
    }
    return null;
  }
}

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj;
  if (hash.has(obj)) return hash.get(obj);
  const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, result);
  return Object.assign(result, ...Object.keys(obj).map(
    key => ({ [key]: deepClone(obj[key], hash) })
  ));
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const originalMatrix = new Matrix([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  print('Original Matrix:');
  print(String(originalMatrix));

  const clonedMatrix = deepClone(originalMatrix);

  originalMatrix.set(0, 0, 99);

  print('\nModified Original Matrix:');
  print(String(originalMatrix));

  print('\nCloned Matrix (should be unchanged):');
  print(String(clonedMatrix));

  print('\nIterating over Matrix elements:');
  for (let value of originalMatrix) {
    print(value);
    await sleep(500);  
  }
})();
