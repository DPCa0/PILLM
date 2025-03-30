 
import { promises as fs } from 'fs';

 
(async function complexOperation() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Network response was not ok');
    const users = await response.json();

     
    const userNames = users.map(({ name, email }) => `${name} <${email}>`);

     
    const uniqueUsers = [...new Set(userNames)];

     
    const greetUser = ([name, email]) => `Hello, ${name} with email ${email}`;

     
    const userProxy = new Proxy(users[0], {
      get(target, prop) {
        print(`Accessing property: ${prop}`);
        return target[prop];
      },
    });

    print(greetUser(uniqueUsers[0].match(/^(.*) <(.*)>$/).slice(1)));

     
    const clonedUser = { ...userProxy, newUser: true };

     
    print(clonedUser.address?.city ?? 'City not available');

     
    await fs.writeFile('users.txt', uniqueUsers.join('\n'));

    print('File written successfully with unique users!');
  } catch (error) {
    console.error('Error encountered:', error);
  }
})();
