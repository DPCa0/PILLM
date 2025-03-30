 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const askQuestion = (query) => {
  return new Promise(resolve => readline.question(query, resolve));
};

 
(async () => {
  try {
    const name = await askQuestion("What's your name? ");
    
     
    const taggedTemplate = (strings, ...expressions) => {
      return strings.reduce((result, string, i) => 
        `${result}${string}<${expressions[i] || ''}>`, '');
    };
    print(taggedTemplate`Hello, ${name}`);

     
    const uniqueKey = Symbol('key');
    const person = { [uniqueKey]: 'Secret Key', name: name, age: 25 };

    const handler = {
      get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} not found`;
      },
      set(target, prop, value) {
        if (typeof value === 'number') {
          target[prop] = value;
          return true;
        }
        console.error(`Attempt to set non-number value: ${value}`);
        return false;
      }
    };

    const proxyPerson = new Proxy(person, handler);

    print(`Accessing age: ${proxyPerson.age}`);
    proxyPerson.age = 30;
    print(`New age set: ${proxyPerson.age}`);
    proxyPerson.age = 'Thirty';  

     
    const { name: personName, ...rest } = proxyPerson;
    print(`Name: ${personName}, Rest: ${JSON.stringify(rest)}`);

     
    const mapExample = new Map();
    mapExample.set('key1', 'value1');
    mapExample.set('key2', 'value2');
    
    print(`Map Size: ${mapExample.size}`);
    for (let [key, value] of mapExample) {
      print(`${key}: ${value}`);
    }

    const setExample = new Set(['apple', 'banana', 'cherry']);
    console.log(`Set has apple: ${setExample.has('apple')