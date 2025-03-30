Certainly! Here's a JavaScript program that utilizes some advanced features such as Promises, async/await, destructuring, and spread/rest operators.

// Simulated fetch function returning a promise
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https: 
        resolve({ status: 200, data: { user: 'John Doe', age: 30, skills: ['JS', 'React', 'Node'] } });
      } else {
        reject({ status: 404, message: 'Not Found' });
      }
    }, 1000);
  });
}

async function getUserData() {
  try {
    const url = 'https://api.example.com/data';
    const { data: { user, age, skills } } = await fetchData(url);

    print(`User: ${user}`);
    print(`Age: ${age}`);

    const [firstSkill, ...otherSkills] = skills;
    print(`First Skill: ${firstSkill}`);
    print(`Other Skills: ${otherSkills.join(', ')}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

getUserData();

 
const addNumbers = (...numbers) => numbers.reduce((sum, n) => sum + n, 0);
const numbersArray = [10, 20, 30, 40];
print(`Sum of Numbers: ${addNumbers(...numbersArray)}`);

This script demonstrates using promises, async/await for handling asynchronous operations, destructuring objects, and utilizing the rest and spread operators for function arguments and arrays.