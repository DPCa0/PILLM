 

 
const fetchUserData = async (userId) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       
      const users = {
        1: { name: 'Alice', age: 28, job: 'Engineer' },
        2: { name: 'Bob', age: 32, job: 'Designer' },
        3: { name: 'Charlie', age: 25, job: 'Artist' },
      };
      if (users[userId]) {
        resolve(users[userId]);
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
};

 
const displayUserInfo = async (userId) => {
  try {
    const { name, age, job } = await fetchUserData(userId);
    console.log(`User Info: 
    Name: ${name}
    Age: ${age}
    Job: ${job}`);
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);
  }
};

 
(async () => {
  await displayUserInfo(1);
  await displayUserInfo(2);
  await displayUserInfo(4);  
})();
