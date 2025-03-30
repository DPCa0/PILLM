 

 

 
function* infiniteSeries(start = 0) {
  let i = start;
  while (true) {
    yield i++;
  }
}

 
const uniqueNumbers = new Set();
const series = infiniteSeries();

 
const numberSquares = new Map();

 
async function processNumbers(limit = 5) {
  const promises = [];
  for (let i = 0; i < limit; i++) {
    promises.push(
      new Promise((resolve) => {
        const number = series.next().value;
        uniqueNumbers.add(number);
        numberSquares.set(number, number * number);
        resolve(number);
      })
    );
  }
  return Promise.all(promises);
}

 
async function main() {
  await processNumbers(10);
  print("Unique Numbers:", [...uniqueNumbers]);
  print("Number Squares:");
  numberSquares.forEach((value, key) => print(`${key}: ${value}`));
}

 
main().catch(console.error);
