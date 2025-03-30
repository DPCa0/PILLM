 

 
function fetchUserData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id, name: 'John Doe', age: 30, email: 'john.doe@example.com' };
      id > 0 ? resolve(data) : reject('Invalid ID');
    }, 1000);
  });
}

 
async function getUserInfo(userId) {
  try {
    const { name, age, email } = await fetchUserData(userId);   
    print(`User Info:\nName: ${name}\nAge: ${age}\nEmail: ${email}`);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
async function fetchMultipleUsers(userIds) {
  try {
    const users = await Promise.all(userIds.map(id => fetchUserData(id)));
    users.forEach(({ name, age, email }, index) => {
      print(`User ${index + 1}:\nName: ${name}\nAge: ${age}\nEmail: ${email}`);
    });
  } catch (error) {
    console.error('Error fetching multiple users:', error);
  }
}

 
getUserInfo(1);
fetchMultipleUsers([1, 2, 3, -1]);   
