 

function* generateNumbers(limit) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}

async function asyncSquare(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * number);
    }, Math.random() * 1000);
  });
}

async function processNumbers(limit) {
  const generator = generateNumbers(limit);
  const results = [];

  for (let number of generator) {
    let result = await asyncSquare(number);
    print(`Square of ${number}: ${result}`);
    results.push(result);
  }

  return results;
}

(async () => {
  try {
    const squares = await processNumbers(5);
    print('All squares computed:', squares);
  } catch (error) {
    console.error('Error:', error);
  }
})();
