 
const fetchUserData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice", age: 28 },
        { id: 2, name: "Bob", age: 34 },
        { id: 3, name: "Charlie", age: 23 }
      ]);
    }, 1000);
  });
};

 
const displayUser = ({ id, name, age }) => {
  print(`User ID: ${id}, Name: ${name}, Age: ${age}`);
};

 
(async () => {
  try {
    const users = await fetchUserData();
    
     
    users
      ?.map(user => ({ ...user, ageCategory: user.age > 30 ? 'Senior' : 'Junior' }))
      .forEach(user => {
        displayUser(user);
         
        print(loggingTag`User ${user.name} is in the ${user.ageCategory} category.`);
      });

  } catch (error) {
    console.error("Error fetching user data", error);
  }
})();

 
function loggingTag(strings, name, category) {
  const currentDate = new Date().toISOString();
  return `[${currentDate}] ${strings[0]}${name}${strings[1]}${category}${strings[2]}`;
}
