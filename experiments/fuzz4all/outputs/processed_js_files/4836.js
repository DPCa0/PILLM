 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: 'Alice', age: 30 }, hobbies: ['Reading', 'Hiking', 'Coding'] });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
     
    const { user: { name, age }, hobbies } = await fetchData();

     
    const userInfo = `Name: ${name}, Age: ${age}`;
    const hobbyList = hobbies.map((hobby, index) => `${index + 1}. ${hobby}`).join('\n');

     
    print(`User Info:\n${userInfo}\n\nHobbies:\n${hobbyList}`);
  } catch (error) {
     
    console.error('Error fetching user data:', error);
  }
};

 
processUserData();
