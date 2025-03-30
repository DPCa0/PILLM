 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const greetUser = (name) => `Hello, ${name}! Welcome to the complex JavaScript program.`;

 
const getInput = (query) => new Promise((resolve) => readline.question(query, resolve));

 
(async () => {
  try {
    const name = await getInput('What is your name? ');
    print(greetUser(name));

     
    const dataMap = new Map();
    const tempWeakMap = new WeakMap();

    dataMap.set('language', 'JavaScript');
    tempWeakMap.set({}, 'Temporary Data');

     
    const uniqueKey = Symbol('unique');
    const complexObject = { [uniqueKey]: 'Hidden Value' };

    Reflect.set(complexObject, 'language', 'Node.js');
    print(`Your selected language: ${dataMap.get('language')}`);
    print(`Unique property: ${complexObject[uniqueKey]}`);

     
    setTimeout(() => {
      const { language } = complexObject;
      print(`Language from complex object: ${language}`);
      readline.close();
    }, 1000);

  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
})();
