 
class Matrix {
  constructor(data) {
    this.data = data;
  }

  static identity(size) {
    return new Matrix([...Array(size)].map((_, i) => [...Array(size)].map((_, j) => (i === j ? 1 : 0))));
  }

  multiply(matrix) {
    const result = this.data.map((row, i) =>
      matrix.data[0].map((_, j) => row.reduce((sum, elm, k) => sum + elm * matrix.data[k][j], 0))
    );
    return new Matrix(result);
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

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
(async () => {
   
  const identityMatrix = Matrix.identity(3);
  print('Identity Matrix:\n' + identityMatrix);

  const anotherMatrix = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);

  const multipliedMatrix = identityMatrix.multiply(anotherMatrix);
  print('\nMultiplied Matrix:\n' + multipliedMatrix);

   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('\nFetched Data:', data);
  } catch (error) {
    console.error('\nFailed to fetch data:', error);
  }

   
  print('\nFibonacci sequence:');
  for (let num of fibonacci(5)) {
    print(num);
  }
})();
