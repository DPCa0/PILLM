 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
async function getFibonacciSequence(n) {
  const fibGen = fibonacciGenerator();
  const fibNumbers = [];
  
  for (let i = 0; i < n; i++) {
    const fibNumber = fibGen.next().value;
    fibNumbers.push(fibNumber);
    print(`Fibonacci[${i}]:`, fibNumber);
    await delay(500);  
  }
  
  return fibNumbers;
}

 
(async () => {
  const fibSequenceLength = 10;
  print(`Generating the first ${fibSequenceLength} Fibonacci numbers...`);
  
  const fibSequence = await getFibonacciSequence(fibSequenceLength);
  print('Fibonacci Sequence:', fibSequence);
})();
