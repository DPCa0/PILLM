 

 
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
      ]);
    }, 1000);
  });
};

 
const formatAge = (age) => `${age} years old`;

 
(async () => {
  try {
    const userData = await fetchUserData();

     
    const userMap = new Map(userData.map(({ id, name, age }) => [id, { name, age: formatAge(age) }]));

     
    const userIDs = new Set(userMap.keys());

     
    userIDs.forEach((id) => {
      const { name, age } = userMap.get(id);
      print(`User ID: ${id}, Name: ${name}, Age: ${age}`);
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
