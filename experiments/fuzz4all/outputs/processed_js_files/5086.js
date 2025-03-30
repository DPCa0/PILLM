 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const askQuestion = async (query) => {
  return new Promise((resolve) => readline.question(query, resolve));
};

 
const createValidatedObject = (obj) => {
  return new Proxy(obj, {
    set(target, property, value) {
      if (typeof value !== 'string' || value.length === 0) {
        throw new Error(`Invalid value for ${property}. Must be a non-empty string.`);
      }
      target[property] = value;
      return true;
    }
  });
};

 
(async () => {
  const user = createValidatedObject({});

  try {
    user.name = await askQuestion('Enter your name: ');
    user.email = await askQuestion('Enter your email: ');
  } catch (error) {
    console.error('Error:', error.message);
    readline.close();
    return;
  }

   
  const { name, email } = user;
  print(`Hello, ${name}! We have recorded your email as ${email}.`);

  readline.close();
})();
