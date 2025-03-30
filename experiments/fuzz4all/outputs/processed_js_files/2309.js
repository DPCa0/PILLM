const fetch = require('node-fetch');

 
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchUserData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const users = await response.json();

     
    for (const { name, email, address: { city } } of users) {
      print(`Name: ${name}, Email: ${email}, City: ${city}`);
      
       
      await sleep(500);
    }
  } catch (error) {
    console.error(`Failed to fetch user data: ${error.message}`);
  }
}

 
class RandomNumberGenerator {
   
  static #max = 100;

   
  static generate() {
    return Math.floor(Math.random() * RandomNumberGenerator.#max);
  }
}

 
(async () => {
  print('Fetching user data...');
  
   
  await fetchUserData();

  print('Generating random numbers...');
  
   
  for (let i = 0; i < 5; i++) {
    print(`Random Number ${i + 1}: ${RandomNumberGenerator.generate()}`);
    await sleep(200);
  }
})();
