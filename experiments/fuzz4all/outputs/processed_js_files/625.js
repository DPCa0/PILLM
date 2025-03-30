 
const fs = require('fs');
const { promisify } = require('util');

 
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

 
(async () => {
  try {
     
    const data = await readFile('input.txt', 'utf8');
    print(`Original data from file: ${data}`);

     
    const transformedData = [...data].map(char => char.toUpperCase()).join('');

     
    const shout = (strings, ...values) => {
      return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? values[i].toUpperCase() : ''}`, '');
    };

    const finalData = shout`Transformed Data: ${transformedData}`;

     
    await writeFile('output.txt', finalData);

    print('File successfully written with transformed data.');

     
    import('./extraModule.js').then(module => {
      module.extraFunction();
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

 
 
 
 

Note: Save this additional file as `extraModule.js` to see the dynamic import in action.

 
export function extraFunction() {
  print("Extra function from dynamically imported module executed.");
}
