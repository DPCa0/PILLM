 
const complexFeaturesDemo = async () => {
   
  const data = { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] };
  const getUsers = () => data.users;

   
  const [firstUser, ...otherUsers] = getUsers();

   
  const fetchUserDetails = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ userId, details: 'User details for ' + userId });
      }, 1000);
    });
  };

  try {
    const firstUserDetails = await fetchUserDetails(firstUser.id);

     
    print(`First User: ${firstUser.name ?? 'Unknown'}, Details: ${firstUserDetails.details ?? 'N/A'}`);

    otherUsers.forEach(async (user) => {
      const userDetails = await fetchUserDetails(user.id);
      print(`Other User: ${user.name ?? 'Unknown'}, Details: ${userDetails.details ?? 'N/A'}`);
    });
  } catch (error) {
    console.error('Error fetching user details:', error?.message ?? 'Unknown error');
  }

   
  const uniqueIds = new Set(data.users.map((user) => user.id));
  const userMap = new Map(data.users.map((user) => [user.id, user.name]));

  print(`Unique User IDs: ${[...uniqueIds].join(', ')}`);
  print(`User Map: ${[...userMap.entries()].map(([id, name]) => `${id}: ${name}`).join(', ')}`);

   
  const secretKey = Symbol('secret');
  firstUser[secretKey] = 'This is a secret value';

  print(`First User Secret: ${firstUser[secretKey]}`);
};

 
complexFeaturesDemo();
