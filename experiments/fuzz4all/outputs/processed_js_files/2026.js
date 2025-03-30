 

 
const fetchAndFilterUsers = async () => {
   
  const fetchUsers = new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'alice@example.com' },  
        { id: 4, name: 'David', email: 'david@example.com' }
      ]);
    }, 1000);
  });

  try {
    const users = await fetchUsers;
    
     
    const uniqueEmails = new Set(users.map(user => user.email));
    
     
    const userMap = new Map(users.map(user => [user.id, user]));

    print('Unique Emails:', uniqueEmails);
    print('User Map:');
    userMap.forEach((user, id) => {
      print(`ID: ${id}, Name: ${user.name}, Email: ${user.email}`);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

 
(async () => {
  await fetchAndFilterUsers();
})();
