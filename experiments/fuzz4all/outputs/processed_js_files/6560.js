 
function* numberGenerator(limit) {
  let number = 1;
  while (number <= limit) {
    yield number++;
  }
}

async function fetchNumberSquare(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * number);
    }, Math.random() * 1000);
  });
}

async function calculateSquares(limit) {
  const generator = numberGenerator(limit);
  let result = generator.next();

  while (!result.done) {
    const number = result.value;
    const square = await fetchNumberSquare(number);
    print(`The square of ${number} is ${square}`);
    result = generator.next();
  }
}

calculateSquares(5).catch(console.error);
