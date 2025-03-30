 
async function getUserData() {
   
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  
   
  const userSummaries = users.map(({ id, name, email }) => {
    return { id, name, email };
  });

   
  const uniqueDomains = new Set(userSummaries.map(user => user.email.split('@')[1]));

   
  await Promise.all(userSummaries.map(async user => {
     
    print(`Logging user: ${user.name} with email: ${user.email}`);
  }));

   
  const [firstUser, ...otherUsers] = userSummaries;

   
  print(`First user: ${firstUser.name}, Email: ${firstUser.email}`);
  print(`Unique email domains: ${[...uniqueDomains].join(', ')}`);
  
   
  print('Other Users:', ...otherUsers);
}

 
(async () => {
  try {
    await getUserData();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
