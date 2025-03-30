 

 
const fetchData = (userId) => new Promise((resolve) => {
  setTimeout(() => {
    const users = {
      1: { name: 'Alice', age: 25 },
      2: { name: 'Bob', age: 30 },
      3: { name: 'Charlie', age: 35 }
    };
    resolve(users[userId]);
  }, 1000);
});

 
async function getUserData(userId) {
  try {
    const user = await fetchData(userId);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.error(error.message);
  }
}

 
function createGreeting(user) {
  return function() {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
  };
}

 
async function main() {
  const user = await getUserData(2);
  if (user) {
    const greeting = createGreeting(user);
    print(greeting());
  }
}

main();
