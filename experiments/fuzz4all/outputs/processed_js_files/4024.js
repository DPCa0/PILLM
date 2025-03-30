 
import readline from 'readline';

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const getUserInput = async (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

 
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

 
(async () => {
  try {
    const input = await getUserInput('Enter your name: ');
    const { length } = input;
    
    const greet = debounce((name) => {
      print(`Hello, ${name}! Your name is ${length} characters long.`);
    }, 500);

    greet(input);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
})();

To run the code, you would need to execute it in an environment where Node.js is available, as it uses Node.js specific modules (`readline`). Save the code to a `.mjs` file to ensure proper execution of ECMAScript modules in Node.js.