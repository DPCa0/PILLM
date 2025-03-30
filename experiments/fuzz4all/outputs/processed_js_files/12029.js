 

function* numberGenerator(max) {
  let num = 1;
  while (num <= max) {
    yield num++;
  }
}

async function processNumbers(generator) {
  for (let num of generator) {
    try {
      const result = await asyncSquare(num);
      print(`Squared result of ${num}: ${result}`);
    } catch (error) {
      console.error(`Error squaring ${num}: ${error}`);
    }
  }
}

function asyncSquare(n) {
  return new Promise((resolve, reject) => {
    if (typeof n !== 'number') {
      reject('Input is not a number');
    } else {
      setTimeout(() => {
        resolve(n * n);
      }, Math.random() * 1000);
    }
  });
}

const maxNumber = 5;
const numbers = numberGenerator(maxNumber);

processNumbers(numbers);
