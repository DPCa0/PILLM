 
const fs = require('fs/promises');

 
(async () => {
  try {
     
    const userMap = new Map();

     
    for (let i = 0; i < 5; i++) {
      const id = Symbol(`user${i}`);
      const userData = {
        name: `User${i}`,
        age: Math.floor(Math.random() * 50) + 20,
      };
      userMap.set(id, userData);
    }

     
    async function* processUsers() {
      for (const [id, user] of userMap.entries()) {
        yield new Promise((resolve) => {
          setTimeout(() => {
            resolve({ id, ...user, processed: true });
          }, 1000);
        });
      }
    }

     
    const results = [];
    for await (const processedUser of processUsers()) {
      print(processedUser);
      results.push(processedUser);
    }

     
    const resultsString = JSON.stringify(results, null, 2);
    await fs.writeFile('./userResults.json', resultsString, 'utf-8');

    print('Results saved to userResults.json');
  } catch (err) {
    console.error('Error processing users:', err);
  }
})();
