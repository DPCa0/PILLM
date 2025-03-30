 

 
const users = [
  { id: 1, name: 'Alice', age: 28, city: 'New York' },
  { id: 2, name: 'Bob', age: 34, city: 'Los Angeles' },
  { id: 3, name: 'Charlie', age: 23, city: 'Chicago' },
  { id: 4, name: 'David', age: 40, city: 'New York' },
  { id: 5, name: 'Eve', age: 29, city: 'San Francisco' }
];

 
const fetchUserData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users);
    }, 1000);
  });
};

 
function* filterUsersByCity(users, city) {
  for (const user of users) {
    if (user.city === city) {
      yield user;
    }
  }
}

 
const displayUserInfo = ({ id, name, age, city } = {}) => {
  console.log(`User Info:
    ID: ${id ?? 'N/A'}
    Name: ${name ?? 'Unknown'}
    Age: ${age ?? 'N/A'}
    City: ${city ?? 'Unknown'}
  `);
};

 
const main = async () => {
  const allUsers = await fetchUserData();
  const nyUsersGenerator = filterUsersByCity(allUsers, 'New York');

  for (const user of nyUsersGenerator) {
    displayUserInfo(user);
  }

   
  const defaultUser = { name: 'Guest' };
  displayUserInfo(defaultUser ?? null);
};

 
main().catch(error => console.error('Error:', error));
