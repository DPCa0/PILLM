 

class User {
  constructor(name) {
    this.name = name;
    this[Symbol.for('id')] = Symbol('id');
  }
}

const user = new User('Alice');

const dataHandler = {
  get(target, property) {
    if (property === 'name') {
      return `User's name is: ${Reflect.get(target, property)}`;
    }
    return Reflect.get(target, property);
  }
};

const proxyUser = new Proxy(user, dataHandler);

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

function delayedGreeting(userName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hello, ${userName}!`);
    }, 1000);
  });
}

async function start() {
  try {
    print(proxyUser.name);
    const userName = proxyUser.name.split(': ')[1];
    const greeting = await delayedGreeting(userName);
    print(greeting);

    const userData = await fetchData('https: 
    print('User data fetched:', userData);
  } catch (error) {
    console.error('Error:', error);
  }
}

start();
