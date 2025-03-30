 
const getUserData = async (userId) => {
  try {
     
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');

    const userData = await response.json();

     
    const { name, email, address: { street, city }, company: { name: companyName } } = userData;

     
    print(`Name: ${name}`);
    print(`Email: ${email}`);
    print(`Address: ${street}, ${city}`);
    print(`Company: ${companyName}`);
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
const getAllUserData = async () => {
  const userIds = [1, 2, 3];
  
  try {
     
    const userPromises = userIds.map(id => getUserData(id));
    
     
    await Promise.all(userPromises);
    
  } catch (error) {
    console.error('Error in fetching all user data:', error);
  }
};

 
(async () => {
  await getAllUserData();
})();
