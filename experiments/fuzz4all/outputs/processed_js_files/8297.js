 

 
(async () => {
  const { fibonacci } = await import('./fibonacci.js');

   
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Advanced JavaScript",
          numbers: [5, 8, 13]
        });
      }, 1000);
    });
  };

   
  const processNumbers = async () => {
    try {
      const { name, numbers } = await fetchData();
      print(`Processing numbers for: ${name}`);

       
      const fibResults = await Promise.all(numbers.map(async (num) => {
        const fib = await fibonacci(num);
        return { num, fib };
      }));

       
      fibResults.forEach(({ num, fib }) => {
        print(`Fibonacci of ${num} is ${fib}`);
      });

    } catch (error) {
      console.error("Error processing numbers:", error);
    }
  };

  processNumbers();

})();

In the example, it is assumed that there is a `fibonacci.js` module that exports a function to compute Fibonacci numbers. Here's a simple implementation of the `fibonacci.js`:

 
export const fibonacci = (n) => {
  if (n <= 1) return n;
  let a = 0, b = 1, sum = 0;
  for (let i = 2; i <= n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return sum;
};
