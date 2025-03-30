 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' },
          { id: 3, name: 'Charlie', role: 'user' }
        ]
      });
    }, 1000);
  });
};

 
const filterAdmins = async () => {
  try {
    const { users } = await fetchData();  
    const admins = users.filter(({ role }) => role === 'admin');  
    return admins;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
(async () => {
  const admins = await filterAdmins();
  print('Admin Users:', admins);
})();
