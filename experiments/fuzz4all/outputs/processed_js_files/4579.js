 
const readline = require('readline');

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Advanced JavaScript', features: ['Promises', 'Async/Await', 'Modules'] });
    }, 1000);
  });
}

 
(async () => {
  print('Fetching data...');

   
  const { id, name, features } = await fetchData();

  print(`Data Fetched: ${id} - ${name}`);
  print('Features:');
  features.forEach((feature, index) => print(`${index + 1}. ${feature}`));

   
  const uniqueKey1 = Symbol('key1');
  const uniqueKey2 = Symbol('key2');

  const myObject = {
    [uniqueKey1]: 'Value associated with uniqueKey1',
    [uniqueKey2]: 'Value associated with uniqueKey2',
  };

  print('Unique Symbols in Object:');
  print(myObject[uniqueKey1]);
  print(myObject[uniqueKey2]);

   
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

   
  rl.question(`Type your name to interact (Type 'exit' to quit): `, function handleInput(name) {
    if (name.toLowerCase() === 'exit') {
      rl.close();
    } else {
      print(`Hello, ${name}! Explore more JavaScript features.`);
      rl.question(`Type another name or 'exit' to quit: `, handleInput);
    }
  });

  rl.on('close', function () {
    print('Exiting the program. Bye!');
    process.exit(0);
  });
})();
