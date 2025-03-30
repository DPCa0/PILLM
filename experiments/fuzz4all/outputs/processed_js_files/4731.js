 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
    yield fetch(`https: 
      .then(response => response.json());
  }
}

(async function() {
  const userIds = [1, 2, 3, 4, 5];
  
  const processUserData = async (userData) => {
    print(`User: ${userData.name}`);
    const posts = await fetch(`https: 
      .then(response => response.json());
    print(`Number of Posts: ${posts.length}`);
  };

   
  const userGenerator = fetchUserData(userIds);
  const processingQueue = [];

  for await (const user of userGenerator) {
    processingQueue.push(processUserData(user));
  }

  await Promise.all(processingQueue);
})();
