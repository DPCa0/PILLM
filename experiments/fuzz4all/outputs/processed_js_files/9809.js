 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processUser = async (userId) => {
  try {
    const user = await fetchData(`https: 
    const { name, email, address: { city, street }, company: { name: companyName } } = user;

     
    const userSymbol = Symbol.for(name);
    
    console.log(`
      User Symbol: ${userSymbol.toString()}
      User Info:
      Name: ${name}
      Email: ${email}
      Address: ${street}, ${city}
      Company: ${companyName}
    `);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

 
const processMultipleUsers = async (userIds) => {
  const userPromises = userIds.map(id => processUser(id));
  await Promise.all(userPromises);
};

processMultipleUsers([1, 2, 3]);
