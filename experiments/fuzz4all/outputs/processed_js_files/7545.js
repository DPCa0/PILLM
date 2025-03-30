 
async function fetchDataAndProcess() {
   
  const fetchUserData = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: 'Alice', age: 30 }, stats: { followers: 300, likes: 500 } });
    }, 1000);
  });

   
  const { user: { name, age }, stats: { followers, likes } } = await fetchUserData();
  
   
  const userInfo = { name, age };
  print(`User: ${name}, Age: ${age}`);
  
   
  const uniqueInteractions = new Set([followers, likes, likes, followers, 100]);
  print(`Unique Interactions: ${[...uniqueInteractions]}`);

   
  const userStats = new Map(Object.entries({ followers, likes }));
  userStats.set('interactions', [...uniqueInteractions].reduce((a, b) => a + b, 0));

  for (const [key, value] of userStats.entries()) {
    print(`${key}: ${value}`);
  }
  
   
  const specialKey = Symbol('secret');
  const userDetail = { ...userInfo, [specialKey]: 'hiddenValue' };

  print(`All User Details: ${JSON.stringify(userDetail)} with hidden: ${userDetail[specialKey]}`);
}

fetchDataAndProcess().catch(console.error);
