 

 
function* userIdGenerator() {
  let userId = 1;
  while (true) {
    yield userId++;
  }
}

 
const fetchUserData = userId => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ userId, name: `User${userId}`, email: `user${userId}@example.com` });
    }, Math.random() * 2000);
  });
};

 
async function processUserData() {
  const userIds = userIdGenerator();
  for (let i = 0; i < 5; i++) {   
    const { value: userId } = userIds.next();
    print(`Fetching data for User ID: ${userId}`);
    const userData = await fetchUserData(userId);
    print(`Received data: `, userData);
  }
}

processUserData();
