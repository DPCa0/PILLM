 

class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
  }

  static multiply(m1, m2) {
    if (m1.data[0].length !== m2.data.length) {
      throw new Error('Matrices cannot be multiplied');
    }
    let result = new Matrix(m1.data.length, m2.data[0].length);
    for (let i = 0; i < result.data.length; i++) {
      for (let j = 0; j < result.data[0].length; j++) {
        result.data[i][j] = m1.data[i].reduce((sum, val, idx) => sum + val * m2.data[idx][j], 0);
      }
    }
    return result;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

async function demoMatrixOperations() {
   
  const response = await new Promise(resolve => 
    setTimeout(() => resolve({ ok: true, data: [[2, 4], [6, 8]] }), 1000)
  );

  if (!response.ok) throw new Error('Failed to fetch data');

  const m1 = new Matrix(2, 2, 1);  
  const m2 = new Matrix(2, 2);
  m2.data = response.data;  

  try {
    const product = Matrix.multiply(m1, m2);
    print('Product of m1 and m2:\n' + product.toString());

     
    print('Flattened product matrix:', [...product]);
  } catch (error) {
    console.error(error.message);
  }
}

demoMatrixOperations();
