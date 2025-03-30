 

 
const fetchUserData = (userId) => new Promise((resolve, reject) => {
  setTimeout(() => {
     
    const users = {
      1: { name: 'Alice', age: 25, profession: 'Engineer' },
      2: { name: 'Bob', age: 30, profession: 'Designer' }
    };
    users[userId] ? resolve(users[userId]) : reject(new Error('User not found'));
  }, 1000);
});

 
const logUserInfo = async (userId) => {
  try {
    const { name, age, profession } = await fetchUserData(userId);
    console.log(`User Info:
    Name: ${name}
    Age: ${age}
    Profession: ${profession}`);
  } catch (error) {
    console.error(error.message);
  }
};

 
(async () => {
  await logUserInfo(1);
  await logUserInfo(3);  
})();
