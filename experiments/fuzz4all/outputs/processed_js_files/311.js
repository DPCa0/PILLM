 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: { id: 1, name: 'John Doe', age: 30 } };
      resolve(data);
    }, 1000);
  });
};

const processUserData = async (url) => {
  try {
     
    const response = await fetchData(url);
    
     
    const { user: { id, name, age } } = response;

     
    print(`User Info:\nID: ${id}\nName: ${name}\nAge: ${age}`);

     
    const uniqueAges = new Set([20, 25, 30, 30, 35]);
    
     
    if (!uniqueAges.has(age)) {
      uniqueAges.add(age);
    }
    
    print('Unique Ages:', ...uniqueAges);

     
    const userMap = new Map();
    userMap.set(id, { name, age });
    
     
    const clonedUserMap = new Map([...userMap]);
    for (const [userId, userInfo] of clonedUserMap.entries()) {
      print(`Map - User ID: ${userId}, User Info:`, userInfo);
    }

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
(async () => {
  await processUserData('https://api.example.com/user');
})();
