 
const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
async function complexOperation() {
  try {
     
    const question = (query) => new Promise(resolve => rl.question(query, resolve));

     
    let { num1 = 0, num2 = 0 } = await question('Enter two numbers separated by a space: ')
      .then(answer => {
        const [num1, num2] = answer.split(' ').map(Number);
        return { num1, num2 };
      });

     
    const results = await Promise.allSettled([
      Promise.resolve(num1 + num2),
      Promise.resolve(num1 * num2),
      Promise.resolve(num1 / num2)
    ]);

     
    const operations = new Map([
      ['Sum', results[0]],
      ['Product', results[1]],
      ['Quotient', results[2]]
    ]);

     
    for (const [operation, result] of operations) {
      if (result.status === 'fulfilled') {
        print(`${operation}: ${result.value}`);
      } else {
        print(`${operation}: Error occurred`);
      }
    }

     
    const additionalInfo = operations?.get('Sum')?.value ?? 'No additional info';
    print('Additional Info:', additionalInfo);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
     
    rl.close();
  }
}

 
complexOperation();
