class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
    await delay(100);   
  }
}

const processFibonacci = async (n) => {
  const fibs = [];
  try {
    const fibGen = fibonacciGenerator();
    for await (const num of fibGen) {
      fibs.push(num);
      if (fibs.length === n) break;
    }
  } catch (error) {
    throw new CustomError("Failed to process Fibonacci sequence");
  }
  return fibs;
};

(async () => {
  try {
    const fibonacciNumbers = await processFibonacci(10);
    const result = fibonacciNumbers.reduce((acc, val) => acc + val, 0);
    print(`Sum of the first 10 Fibonacci numbers is: ${result}`);
  } catch (error) {
    console.error(error);
  }
})();
