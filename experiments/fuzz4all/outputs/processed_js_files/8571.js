 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        users: [
          { id: 1, name: 'Alice', hobbies: ['Reading', 'Traveling'] },
          { id: 2, name: 'Bob', hobbies: ['Cooking', 'Gaming'] },
          { id: 3, name: 'Charlie', hobbies: ['Hiking', 'Photography'] },
        ],
      };
      resolve(data);
    }, 1000);
  });
}

 
async function processUserData() {
  try {
    const { users } = await fetchData('https://api.mock.com/users');

     
    const userMap = new Map();
    const uniqueHobbies = new Set();

    users.forEach(({ id, name, hobbies }) => {
      userMap.set(id, name);
      hobbies.forEach(hobby => uniqueHobbies.add(hobby));
    });

     
    print('User Names:', [...userMap.values()].join(', '));

     
    print('Unique Hobbies:', [...uniqueHobbies].join(', '));

  } catch (error) {
    console.error('Error processing user data:', error);
  }
}

 
processUserData();
