 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
function getNumber() {
  return new Promise((resolve) => {
    readline.question('Enter a number: ', num => resolve(parseInt(num)));
  });
}

 
(async function() {
  try {
     
    const [a = 1, b = 1] = await Promise.all([getNumber(), getNumber()]);

     
    const result = Math?.pow(a, b) ?? 'Error in computation';

     
    function tag(strings, ...values) {
      return strings.raw[0].split('\\n').map((line, index) => `${line}${values[index] || ''}`).join('\n');
    }

     
    const fibonacci = (n, cache = {}) => cache[n] ??= n < 2 ? n : fibonacci(n - 1, cache) + fibonacci(n - 2, cache);

    print(tag`You entered:\nFirst number: ${a}\nSecond number: ${b}\nPower result: ${result}`);
    print(`Fibonacci of ${a} is: ${fibonacci(a)}`);
    
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    readline.close();
  }
})();
