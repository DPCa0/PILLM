 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ userId: 1, name: 'John Doe', age: 30, location: 'New York' });
  }, 2000);
});

 
const processUserData = async () => {
  try {
     
    const userData = await fetchData();
    
     
    const { userId, name, age, location } = userData;
    
     
    const message = `User Info: 
      - ID: ${userId}
      - Name: ${name}
      - Age: ${age}
      - Location: ${location}`;
    
     
    return message;
  } catch (error) {
     
    return `An error occurred: ${error.message}`;
  }
};

 
(async () => {
  const result = await processUserData();
  print(result);
})();
