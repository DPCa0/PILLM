 

const getUserData = async (userId) => {
   
  const fetchUser = (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = {
          1: { name: 'Alice', age: 30 },
          2: { name: 'Bob', age: 25 },
        };
        const user = users[id];
        user ? resolve(user) : reject(new Error('User not found'));
      }, 1000);
    });

  try {
    const { name, age } = await fetchUser(userId);  
    print(`User Found: ${name}, Age: ${age}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
const processScores = (scores) => {
  const uniqueScores = new Set(scores);  
  const scoreMap = new Map([...uniqueScores].map((score) => [score, score * 2]));

  print('Unique Scores and Their Doubles:');
  scoreMap.forEach((double, score) => print(`Score: ${score}, Double: ${double}`));
};

 
getUserData(1);
processScores([10, 20, 20, 30, 40, 40, 50]);

 
const userProfile = {
  name: 'Charlie',
  age: 28,
};

const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const proxiedProfile = new Proxy(userProfile, handler);

proxiedProfile.name = 'Dave';
print(proxiedProfile.age);
