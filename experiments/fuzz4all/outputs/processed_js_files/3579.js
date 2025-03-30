 

 
class Matrix {
  #data;  

  constructor(rows, cols, initialValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.#data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => initialValue)
    );
  }

   
  getValue(row, col) {
    return this.#data[row][col];
  }

  setValue(row, col, value) {
    this.#data[row][col] = value;
  }

  printMatrix() {
    console.table(this.#data);
  }

   
  static identity(size) {
    let identityMatrix = new Matrix(size, size);
    for (let i = 0; i < size; i++) {
      identityMatrix.setValue(i, i, 1);
    }
    return identityMatrix;
  }
}

 
const fetchData = async () => {
  const fetchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 2000);
  });

  try {
    const result = await fetchPromise;
    print(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const arrayOperations = () => {
  const numbers = [1, 2, 3, 4, 5];
  const [first, second, ...rest] = numbers;
  print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);

  const person = { name: 'Alice', age: 30, city: 'Wonderland' };
  const { name, ...others } = person;
  print(`Name: ${name}, Others: ${JSON.stringify(others)}`);
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    set: (obj, prop, value) => {
      print(`Setting value ${value} to property ${prop}`);
      obj[prop] = value;
      return true;
    },