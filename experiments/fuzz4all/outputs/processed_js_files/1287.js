 
import readline from 'readline';

 
const askQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(question, (answer) => {
    rl.close();
    resolve(answer);
  }));
};

 
function* numberSequenceGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

(async () => {
  try {
    const answer = await askQuestion("How many numbers would you like to generate? ");

    const numberGenerator = numberSequenceGenerator();

    const num = parseInt(answer);

     
    const generatedNumbers = [...Array(num)].map(() => numberGenerator.next().value);

    print(`Generated Numbers: ${generatedNumbers.join(', ')}`);

     
    const uniqueNumbers = new Set(generatedNumbers);

    print(`Unique Numbers: ${[...uniqueNumbers].join(', ')}`);

     
    const handler = {
      get(target, property) {
        if (property === 'push') {
          return function(...args) {
            print(`Adding ${args} to the array.`);
            return target.push(...args);
          };
        }
        return Reflect.get(target, property);
      }
    };

    const proxiedNumbers = new Proxy(generatedNumbers, handler);

    proxiedNumbers.push(100);

    print(`Updated Numbers: ${proxiedNumbers.join(', ')}`);

  } catch (error) {
    console.error("An error occurred: ", error);
  }
})();
