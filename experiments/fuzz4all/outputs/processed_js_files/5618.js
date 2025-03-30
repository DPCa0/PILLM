 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
(async () => {
   
  const askQuestion = (question) => new Promise(resolve => readline.question(question, resolve));

   
  const user = new Proxy({}, {
    set: (obj, prop, value) => {
      print(`Setting property ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });

  user.name = await askQuestion("What's your name? ");
  user.age = await askQuestion("How old are you? ");

   
  const id = Symbol('id');
  user[id] = 12345;

   
  const { name = 'Guest', age = 'unknown' } = user;

   
  const formatMessage = (strings, ...values) => {
    return strings.reduce((prev, curr, i) => `${prev}${curr.toUpperCase()}${values[i] || ''}`, '');
  };

  print(formatMessage`Hello ${name}, you are ${age} years old!`);

   
  readline.close();
})();
