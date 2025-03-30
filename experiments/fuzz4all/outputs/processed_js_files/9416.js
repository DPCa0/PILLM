 
async function complexAsyncOperation() {
  const delayedPromise = (val) => new Promise(resolve => setTimeout(() => resolve(val), 1000));

  try {
     
    const [result1, result2] = await Promise.all([
      delayedPromise(42),
      delayedPromise(58),
    ]);

     
    const numbers = [result1, result2, 100, 200];
    const squaredNumbers = numbers.map(num => num ** 2);
    const [firstSquare, secondSquare, ...restSquares] = squaredNumbers;

     
    const uniqueSquares = [...new Set([...restSquares, firstSquare])];

     
    print(`Result 1 squared: ${firstSquare}`);
    print(`Result 2 squared: ${secondSquare}`);
    print(`Unique squares from array: ${uniqueSquares}`);

     
    const uniqueId = Symbol('id');
    const complexObject = {
      [uniqueId]: 'Unique Identifier',
      originalNumbers: numbers,
      squaredNumbers: uniqueSquares
    };

     
    print(`Complex object unique ID: ${complexObject[uniqueId]}`);
    print(`Complex object details:`, complexObject);

  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

complexAsyncOperation();
