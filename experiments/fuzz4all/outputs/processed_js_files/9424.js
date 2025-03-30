 
const fs = require('fs');
const path = require('path');

 
(async () => {
  try {
     
    const { dir, base } = path.parse(__filename);
    print(`Current Directory: ${dir}\nFile Name: ${base}`);

     
    const numbers = [1, 2, 3, 4, 5];
    const squaredEvenNumbers = numbers
      .map(num => num * num)
      .filter(num => num % 2 === 0);

    print('Squared Even Numbers:', squaredEvenNumbers);

     
    const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
    const uniqueArray = [...new Set(arrayWithDuplicates)];
    print('Unique Array:', uniqueArray);

     
    const filePath = path.join(__dirname, 'example.txt');
    const fileData = await fs.promises.readFile(filePath, 'utf8');
    print('File Content:', fileData);

     
    if (typeof require !== 'function') {
      const { default: lodash } = await import('lodash');
      print('Shuffled Array:', lodash.shuffle(numbers));
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
