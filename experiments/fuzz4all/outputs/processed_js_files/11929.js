const fetchUserData = async (userId) => {
   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1000);
  
   
  const userData = {
    1: { name: "Alice", age: 28 },
    2: { name: "Bob", age: 35 },
    3: { name: "Charlie", age: 22 }
  };
  return userData[userId] || null;
};

const processUserData = async (userId) => {
  try {
    const data = await fetchUserData(userId);
    if (!data) throw new Error('User not found');
    
     
    const { name, age } = data;
    
     
    print(`User found: ${name}, Age: ${age}`);
    
     
    const uniqueAges = new Set([...Object.values(data), 25]);
    print(`Unique ages including new entry: ${[...uniqueAges]}`);
    
     
    const nameLengthMap = new Map(Object.entries(data).map(([key, value]) => [key, value.length]));
    print('Name length map:', nameLengthMap);
    
  } catch (error) {
    console.error(error.message);
  }
};

 
(async () => {
  for (let i = 1; i <= 3; i++) {
    await processUserData(i);
  }
   
  await processUserData(4)?.catch(console.error);
})();
