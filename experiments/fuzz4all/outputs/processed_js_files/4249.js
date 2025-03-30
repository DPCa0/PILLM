class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }

  static fromArray(arr) {
    const mat = new Matrix(arr.length, arr[0].length);
    mat.data = arr;
    return mat;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B");
    return new Matrix(a.rows, b.cols).map((_, i, j) => 
      a.data[i].reduce((sum, _, k) => sum + a.data[i][k] * b.data[k][j], 0)
    );
  }

  map(callback) {
    this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return this;
  }

  display() {
    console.table(this.data);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

function* primeGenerator() {
  let num = 2;
  const isPrime = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
  };
  while (true) {
    if (isPrime(num)) yield num;
    num++;
  }
}

const primes = primeGenerator();
print([...Array(5)].map(() => primes.next().value));  

const a = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
const b = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);
const c = Matrix.multiply(a, b);
c.display();  

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    print(data.slice(0, 5));  
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
})();
