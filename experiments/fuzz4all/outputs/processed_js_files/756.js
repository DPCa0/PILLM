 

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
async function fetchData(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num % 2 === 0) {
        resolve(`Fetched data for even number: ${num}`);
      } else {
        reject(`Failed to fetch data for odd number: ${num}`);
      }
    }, 500);
  });
}

 
const processNumbers = async (...numbers) => {
  const [first = 0, second = 1, ...rest] = numbers;
  print(`Processing numbers: ${first}, ${second}, ${rest}`);

  try {
    const responses = await Promise.all(numbers.map(async (num) => {
      const result = await fetchData(num);
      return result;
    }));

    print('Responses:', responses);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
const gen = numberGenerator();
const numbersToProcess = [...Array(5)].map(() => gen.next().value);
processNumbers(...numbersToProcess);
