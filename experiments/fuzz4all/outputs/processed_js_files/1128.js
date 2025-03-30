 

 
const fetchUserData = async (userId) => {
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  const users = {
    1: { name: 'Alice', age: 30, email: 'alice@example.com' },
    2: { name: 'Bob', age: 25, email: 'bob@example.com' }
  };
  return users[userId] || null;
};

 
const displayUserInfo = async (userId) => {
  try {
    const user = await fetchUserData(userId);
    if (!user) throw new Error('User not found');

     
    const { name, age, email } = user;
    print(`Name: ${name}, Age: ${age}, Email: ${email}`);
    
     
    const updatedUser = { ...user, status: 'Active' };
    print(`Updated User Info: ${JSON.stringify(updatedUser)}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
(async () => {
  const userIds = [1, 2, 3];
   
  for (const id of userIds) {
    await displayUserInfo(id);
  }
})();
