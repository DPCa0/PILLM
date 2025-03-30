 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const handler = {
  get(target, prop, receiver) {
    print(`Property "${prop}" accessed`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Property "${prop}" set to "${value}"`);
    return Reflect.set(...arguments);
  }
};

const user = new Proxy({}, handler);

 
async function getUserInput(query) {
  return new Promise(resolve => readline.question(query, resolve));
}

 
function* fibonacci(n) {
  let a = 0, b = 1, i = 0;
  while (i < n) {
    yield a;
    [a, b] = [b, a + b];
    i++;
  }
}

(async () => {
  try {
    user.name = await getUserInput("What's your name? ");
    user.age = await getUserInput("How old are you? ");

    print(`Hello, ${user.name}, you are ${user.age} years old!`);

    const fibSequence = fibonacci(10);
    print("Fibonacci sequence up to 10:");
    for (let num of fibSequence) {
      print(num);
    }

  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    readline.close();
  }
})();
