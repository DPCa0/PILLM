 
const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const question = (query) => new Promise(resolve => rl.question(query, resolve));

 
(async () => {
  try {
     
    const [name, age] = await Promise.all([
      question("What's your name? "),
      question("How old are you? ")
    ]);

     
    print(`Hello, ${name}! You are ${age} years old.`);

     
    const userData = new Map([
      ['name', name],
      ['age', parseInt(age)]
    ]);

     
    const summary = `
      Name: ${userData.get('name') ?? 'Unknown'}
      Age: ${userData.get('age') ?? 0}
      Is Adult: ${userData.get('age') >= 18 ? 'Yes' : 'No'}
    `;

    print(summary.trim());

     
    const numbers = [1, 2, 3, 4, 5];
    const squared = numbers.map(num => num ** 2);
    print(`Squared Numbers: ${squared.join(', ')}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
})();
