 
const fs = require('fs');
const readline = require('readline');

 
(async function main() {
   
  const fileContent = await fs.promises.readFile('data.json', 'utf-8');
  const jsonData = JSON.parse(fileContent);

   
  const dataHandler = {
    set(target, key, value) {
      print(`Property ${key} is being set to ${value}`);
      target[key] = value;
      return true;
    }
  };

  const observedData = new Proxy(jsonData, dataHandler);

   
  (function* generateNumbers() {
    let num = 0;
    while (true) {
      yield num++;
    }
  })();

   
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a property to change: ', (prop) => {
    rl.question(`Enter a value for ${prop}: `, (value) => {
      observedData[prop] = value;   
      rl.close();
    });
  });

   
  const uniqueValues = new Set(Object.values(observedData));
  const dataMap = new Map(Object.entries(observedData));

  print('Unique values:', [...uniqueValues]);
  print('Data as Map:', dataMap);

   
  const logData = () => print(`Final Data: ${JSON.stringify(observedData)}`);
  logData();

})();
