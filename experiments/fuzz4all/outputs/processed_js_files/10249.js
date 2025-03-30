 
const fs = require('fs').promises;

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexOperation() {
  try {
     
    const {a = 1, b = 2} = {a: 5};
    const result = a ** b;  

    print(`Calculating: ${a} ** ${b} = ${result}`);

     
    const items = [1, 2, 3];
    const formattedItems = items.map(item => `Item ${item}`);
    print(formattedItems.join(', '));

     
    const obj = {
      result,
      formattedItems,
      async saveToFile() {
        const data = JSON.stringify({result, formattedItems}, null, 2);
        await fs.writeFile('output.json', data);
        print('Data saved to output.json');
      }
    };

     
    const extendedObj = {...obj, additional: 'info'};
    print(extendedObj);

    await delay(1000);  
    await obj.saveToFile();

     
    print(obj?.nonExistentProperty ?? 'No such property');

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

complexOperation();
