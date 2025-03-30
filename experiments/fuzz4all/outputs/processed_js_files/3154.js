 

 
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Fetching user data failed:', error);
  }
};

 
const printUserInfo = async (userId) => {
  const user = await fetchUserData(userId);
  if (user) {
     
    const { name, email, address: { city }, company: { name: companyName } } = user;
    print(`User Name: ${name}\nEmail: ${email}\nCity: ${city}\nCompany: ${companyName}`);
  }
};

 
(async () => {
  const userIds = [1, 2, 3];
  
   
  const userPromises = userIds.map(userId => printUserInfo(userId));
  
   
  await Promise.all(userPromises);

   
  const uniqueUsers = new Set(userIds);
  print(`Fetched data for unique user IDs: ${[...uniqueUsers].join(', ')}`);
})();
