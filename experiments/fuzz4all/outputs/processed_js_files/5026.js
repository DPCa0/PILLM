 
import { createInterface } from 'readline';

 
const getUserInput = (query) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
};

 
(async () => {
  try {
     
    const favoriteFruits = new Set();

    const numFruits = await getUserInput('How many favorite fruits do you have? ');

    for (let i = 0; i < parseInt(numFruits); i++) {
      const fruit = await getUserInput(`Enter favorite fruit ${i + 1}: `);
      favoriteFruits.add(fruit);
    }

    print(`\nYour unique favorite fruits are:`);
    
     
    [...favoriteFruits].forEach((fruit, index) => print(`${index + 1}: ${fruit}`));

     
    const [firstFruit, secondFruit] = [...favoriteFruits];

     
    print(`\nFirst Fruit: ${firstFruit ?? 'None'}`);
    print(`Second Fruit: ${secondFruit ?? 'None'}`);
    
     
    if (favoriteFruits.has('Mango')) {
      const { celebrateMango } = await import('./celebrateMango.js');
      celebrateMango();
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
