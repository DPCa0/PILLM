 

function* generateNumbers() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

async function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id % 2 === 0) {
        resolve(`Fetched data for ID: ${id}`);
      } else {
        reject(`Error fetching data for ID: ${id}`);
      }
    }, 1000);
  });
}

async function processNumbers(generator, limit) {
  for (let i = 0; i < limit; i++) {
    let num = generator.next().value;
    try {
      let data = await fetchData(num);
      print(data);
    } catch (error) {
      console.error(error);
    }
  }
}

const numbersGenerator = generateNumbers();
processNumbers(numbersGenerator, 10);
