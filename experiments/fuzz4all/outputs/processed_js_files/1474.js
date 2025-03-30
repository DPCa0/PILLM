 

 
async function fetchUserData(userId) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `User ${userId}`,
        age: 25 + userId,
        address: { city: 'New York', country: 'USA' }
      });
    }, 1000);
  });
}

 
const logSymbol = Symbol('log');

 
async function processUserData(userId) {
  try {
    const { name, age, address: { city } } = await fetchUserData(userId);
    const userLog = {
      [logSymbol]: `User ${userId} processed`,
      info: `${name}, Age: ${age}, City: ${city}`
    };

    print(`Processing User: ${userLog[logSymbol]}`);
    print(`User Info: ${userLog.info}`);
  } catch (error) {
    console.error('Error processing user data:', error);
  }
}

 
[1, 2, 3].forEach(id => processUserData(id));
