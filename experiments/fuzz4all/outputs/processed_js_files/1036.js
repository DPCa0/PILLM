class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => fill)
    );
  }

  static random(rows, cols, range = 10) {
    const matrix = new Matrix(rows, cols);
    matrix.map(() => Math.floor(Math.random() * range));
    return matrix;
  }

  static add(a, b) {
    if (a.data.length !== b.data.length || a.data[0].length !== b.data[0].length) {
      throw new Error('Matrices must have the same dimensions');
    }
    const result = new Matrix(a.data.length, a.data[0].length);
    result.map((_, i, j) => a.data[i][j] + b.data[i][j]);
    return result;
  }

  map(fn) {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        this.data[i][j] = fn(this.data[i][j], i, j);
      }
    }
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const factorial = memoize((n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

(async () => {
  try {
    const data = await fetchData('https://api.github.com/repos/javascript');
    print(`Repo: ${data.name}, Stars: ${data.stargazers_count}`);
  } catch (error) {
    console.error('Fetch error:', error);
  }

  print('Factorial of 5:', factorial(5));

  const a = Matrix.random(3, 3);
  const b = Matrix.random(3, 3);
  console