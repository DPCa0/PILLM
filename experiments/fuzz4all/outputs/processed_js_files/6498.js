 
const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const getInput = (query) => new Promise(resolve => rl.question(query, resolve));

 
const proxyHandler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }
    return `Property ${property} does not exist`;
  }
};

 
const asyncOperation = (message, delay) => new Promise(resolve => setTimeout(() => resolve(message), delay));

 
(async () => {
  try {
    const userName = await getInput("What's your name? ");
    print(`Hello, ${userName}!`);

    const userObj = new Proxy({ name: userName, role: 'learner' }, proxyHandler);
    print(`Welcome, ${userObj.name}. Your role is: ${userObj.role}.`);
    print(userObj.nonExistentProp);

     
    const results = await Promise.all([
      asyncOperation('Operation 1 completed', 1000),
      asyncOperation('Operation 2 completed', 2000),
      asyncOperation('Operation 3 completed', 3000)
    ]);

    print(results.join('\n'));

     
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    const union = new Set([...set1, ...set2]);
    print(`Union of sets: ${[...union]}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();  
  }
})();
