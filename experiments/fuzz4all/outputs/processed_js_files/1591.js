 
import { createInterface } from 'readline/promises';

 
async function main() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

   
  const uniqueID = Symbol('id');

   
  const userData = new Map();

   
  function* generateID() {
    let id = 0;
    while (true) {
      yield ++id;
    }
  }

  const idGenerator = generateID();

  try {
    while (true) {
      const name = await rl.question('Enter your name (or type "exit" to quit): ');

      if (name.toLowerCase() === 'exit') break;

       
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');

      const userId = idGenerator.next().value;

       
      userData.set(userId, { [uniqueID]: userId, firstName, lastName });

      print(`Hello, ${firstName}! Your unique ID is: ${userId}`);
    }

     
    const uniqueUsers = new Set([...userData.values()]);

    print('\nRegistered Users:');
    uniqueUsers.forEach(user => {
      const { [uniqueID]: id, firstName, lastName } = user;
      print(`ID: ${id}, Name: ${firstName} ${lastName}`);
    });

  } finally {
    rl.close();
  }
}

main().catch(console.error);
