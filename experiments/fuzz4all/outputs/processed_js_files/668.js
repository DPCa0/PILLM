const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processUser = (user) => {
  const { name, email, address: { city } } = user;
  return `Name: ${name}, Email: ${email}, City: ${city}`;
};

const main = async () => {
  try {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const processedUsers = users.map(user => processUser(user));
    processedUsers.forEach(user => print(user));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

main();

 
 
 
 
 
 
