 

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
async function fetchData(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num % 2 === 0) {
        resolve(`Data for even number ${num}`);
      } else {
        reject(new Error(`Failed to fetch data for odd number ${num}`));
      }
    }, 500);
  });
}

 
async function processSequence() {
  const sequence = infiniteSequence();
  for (let i = 0; i < 10; i++) {
    const num = sequence.next().value;
    try {
      const data = await fetchData(num);
      print(data);
    } catch (error) {
      console.error(error.message);
    }
  }
}

 
processSequence();
