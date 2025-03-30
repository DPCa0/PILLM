 

 
const fetchUserData = async (userId) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User${userId}`, age: 20 + userId });
    }, 1000);
  });
};

 
const processUserData = (processFn) => async (userId) => {
  const userData = await fetchUserData(userId);
  return processFn(userData);
};

 
const displayUserInfo = ({ id, name, age }) => {
  return `User Info: ID - ${id}, Name - ${name}, Age - ${age}`;
};

 
const handleMultipleUsers = async (userIds) => {
  const results = await Promise.all(
    userIds.map(processUserData(displayUserInfo))
  );
  results.forEach((result) => print(result));
};

 
handleMultipleUsers([1, 2, 3]);
