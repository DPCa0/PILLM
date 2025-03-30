 
const fs = require('fs').promises;

 
async function complexFeatureDemo() {
  try {
     
    const { format } = await import('date-fns');

     
    const [first, second, third = 'default'] = ['one', 'two'];

     
    const emphasize = (strings, ...values) => strings.map((str, i) => `${str}**${values[i] || ''}**`).join('');
    print(emphasize`Values are: ${first}, ${second}, and ${third}.`);

     
    await fs.writeFile('output.txt', emphasize`Timestamp: ${format(new Date(), 'PPpp')}`);

     
    const handler = {
      set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
      },
    };
    const obj = new Proxy({}, handler);
    obj.newProperty = 'newValue';

     
    const result = [1, 2, 3, 4, 5]
      .map(x => x * 2)
      .filter(x => x > 5)
      .reduce((acc, curr) => acc + curr, 0);
    print(`Result of array operations: ${result}`);

     
    const uniqueKey = Symbol('unique');
    const symbolObject = {
      [uniqueKey]: 'Symbol Property Value'
    };
    print(`Accessing symbol property: ${symbolObject[uniqueKey]}`);
  } catch (error) {
    console.error(`Error encountered: ${error.message}`);
  }
}

complexFeatureDemo();
