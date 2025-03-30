 

function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

async function fetchData(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (number % 2 === 0) {
        resolve(`Fetched data for even number: ${number}`);
      } else {
        reject(`Error: Odd number ${number}`);
      }
    }, 1000);
  });
}

async function processNumbers() {
  const generator = numberGenerator();
  for (let i = 0; i < 5; i++) {
    const { value: number } = generator.next();
    try {
      const data = await fetchData(number);
      print(data);
    } catch (error) {
      console.error(error);
    }
  }
}

processNumbers();
