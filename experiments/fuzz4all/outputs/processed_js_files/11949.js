 
async function* asyncNumberGenerator() {
  let i = 1;
  while (i <= 5) {
    yield await new Promise(resolve => 
      setTimeout(() => resolve(i++), 1000)
    );
  }
}

 
async function processNumbers() {
  const results = [];
  for await (const number of asyncNumberGenerator()) {
    results.push(number);
    print(`Received: ${number}`);
  }

   
  const [first, ...rest] = results;
  print(`First number: ${first}`);
  print(`Other numbers: ${rest.join(', ')}`);

   
  const sum = await Promise.all(results.map(async (num) => num * 2))
    .then(doubledNumbers => doubledNumbers.reduce((acc, curr) => acc + curr, 0));
  
  print(`Sum of doubled numbers: ${sum}`);
}

 
processNumbers();
