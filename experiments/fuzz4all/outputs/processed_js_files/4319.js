 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
async function processInput() {
  const userResponse = await new Promise(resolve => 
    readline.question("What's your favorite programming language? ", resolve)
  );

   
  const languages = {
    js: { fullName: 'JavaScript', popularity: 'High' },
    py: { fullName: 'Python', popularity: 'High' },
    cpp: { fullName: 'C++', popularity: 'Medium' }
  };

  const { [userResponse.toLowerCase()]: { fullName, popularity } = { fullName: 'Unknown', popularity: 'Unknown' } } = languages;

  print(`You chose ${fullName}, which has ${popularity} popularity.`);

   
  const uniqueChars = new Set([...userResponse]);
  print(`Unique characters in your input: ${[...uniqueChars].join(', ')}`);

   
  const upperCasedChars = [...uniqueChars].map(char => char.toUpperCase());
  print(`Uppercased unique characters: ${upperCasedChars.join(', ')}`);

  readline.close();
}

 
processInput();
