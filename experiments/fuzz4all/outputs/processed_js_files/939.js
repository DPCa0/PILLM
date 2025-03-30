 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const crypto = require('crypto');

 
async function getUserInput(query) {
  return new Promise(resolve => readline.question(query, resolve));
}

 
const dataMap = new Map();
const uniqueSet = new Set();

(async function main() {
  try {
     
    const name = await getUserInput("Enter your name: ");
    const [firstName = 'Guest', lastName = 'User'] = name.split(' ');
    
     
    const greeting = (first = 'Guest', last = 'User') => `Hello, ${first} ${last}!`;
    
    print(greeting(firstName, lastName));

     
    const userId = crypto.randomUUID();
    dataMap.set(userId, { firstName, lastName });
    uniqueSet.add(userId);

     
    const newUser = { ...dataMap.get(userId), userId, createdAt: new Date() };
    print('User Data:', newUser);

     
    const handler = {
      get: (target, property) => (property in target ? target[property] : 'Property not found')
    };
    const proxyUser = new Proxy(newUser, handler);
    print('Proxy Access:', proxyUser.firstName, proxyUser.nonExistingProperty);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    readline.close();
  }
})();
