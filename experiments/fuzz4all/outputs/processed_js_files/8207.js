Certainly! Below is a complex JavaScript program using advanced features such as Promises, async/await, closures, destructuring, and spread/rest operators:

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({name: 'John Doe', age: 30, skills: ['JavaScript', 'React', 'Node.js']}), 1000);
});

 
async function processUserData() {
  try {
    const { name, age, skills } = await fetchData();  
    print(`User: ${name}, Age: ${age}`);
    displaySkills(...skills);  
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
const displaySkills = (() => {
  const prefix = 'Skill:';
  return (...skills) => {  
    skills.forEach(skill => print(`${prefix} ${skill}`));
  };
})();

 
(async () => {
  await processUserData();
})();

This program defines an async function to fetch and process user data. It uses destructuring to extract properties from the fetched object. The `displaySkills` function utilizes a closure to maintain a constant prefix and demonstrates the use of rest and spread operators.