 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* numberStream(max) {
  let count = 0;
  while (count <= max) {
    await delay(500);
    yield count++;
  }
}

 
async function processNumbers() {
  const maxNumber = 5;

   
  const uniqueNumbers = new Set();
  const numberSquares = new Map();

  for await (const num of numberStream(maxNumber)) {
    if (!uniqueNumbers.has(num)) {
      uniqueNumbers.add(num);
      numberSquares.set(num, num * num);
      print(`Number: ${num}, Square: ${num * num}`);
    }
  }

   
  const sumSquares = (...squares) => squares.reduce((acc, n) => acc + n, 0);
  const squareValues = [...numberSquares.values()];
  const totalSum = sumSquares(...squareValues);
  
  print(`Sum of squares: ${totalSum}`);
}

 
(() => {
  print('Starting number processing...');
  processNumbers().then(() => print('Processing complete.'));
})();
