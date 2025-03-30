 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fibonacciAsync(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    await delay(200);  
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
(async () => {
  try {
    readline.question('Enter a number for Fibonacci sequence: ', async (num) => {
      const limit = parseInt(num);
      if (isNaN(limit) || limit <= 0) {
        print('Please enter a valid positive number.');
      } else {
        print(`Fibonacci sequence up to ${limit}:`);
        for await (const val of fibonacciAsync(limit)) {
          print(val);
        }
      }
      readline.close();
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
