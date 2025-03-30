 
async function fetchRandomAdvice() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    print(`Advice #${data.slip.id}: ${data.slip.advice}`);
  } catch (error) {
    console.error('Error fetching advice:', error);
  }
}

 
const loggingHandler = {
  get(target, property, receiver) {
    print(`Property '${property}' has been accessed`);
    return Reflect.get(target, property, receiver);
  }
};

 
const user = {
  name: 'Alice',
  age: 30
};
const proxiedUser = new Proxy(user, loggingHandler);
print(proxiedUser.name);  
print(proxiedUser.age);   

 
(() => {
  print('Running an IIFE using an Arrow Function');
})();

 
function* fibonacciGenerator(n) {
  let a = 0, b = 1;
  while (n--) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibSeq = fibonacciGenerator(10);
for (const num of fibSeq) {
  print(num);
}

 
const teams = new Map([
  ['Team A', ['Alice', 'Bob']],
  ['Team B', ['Charlie', 'Dave']]
]);

const members = new Set();
teams.forEach(teamMembers => teamMembers.forEach(member => members.add(member)));
print('All Team Members:', Array.from(members));

 
fetchRandomAdvice();
