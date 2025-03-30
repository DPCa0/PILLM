 
 

function* numberGenerator(max) {
  let num = 1;
  while (num <= max) {
    yield num++;
  }
}

async function fetchData(api) {
   
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Data from ${api}`), 1000)
  );
}

async function processNumbers(numbers) {
  for await (const number of numbers) {
    print(`Processing number: ${number}`);
    const [api1, api2] = [`API${number}-1`, `API${number}-2`];
    const data1 = await fetchData(api1);
    const data2 = await fetchData(api2);
    print({ number, data1, data2 });
  }
}

const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist!`);
      return undefined;
    }
  },
};

const numbersProxy = new Proxy(numberGenerator(5), handler);

(async function main() {
  print('Starting number processing...');
  await processNumbers(numbersProxy);
  print('Finished processing numbers.');
})();
